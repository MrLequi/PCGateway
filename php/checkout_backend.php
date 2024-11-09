<?php
header('Content-Type: application/json');
session_start();
require 'connection.php';
require '../libraries/fpdf.php'; // Librería para generar PDF

if (!isset($_SESSION['user_id'])) {
    echo json_encode(['error' => 'Usuario no autenticado']);
    exit;
}

$data = json_decode(file_get_contents('php://input'), true);
$user_id = $_SESSION['user_id'];
$paymentMethod = $data['paymentMethod'];

// Guardar el pedido en la base de datos
try {
    $conn->beginTransaction();

    $query = "INSERT INTO orders (user_id, payment_method, status) VALUES (:user_id, :paymentMethod, 'Pending')";
    $stmt = $conn->prepare($query);
    $stmt->execute(['user_id' => $user_id, 'paymentMethod' => $paymentMethod]);
    $order_id = $conn->lastInsertId();

    // Agregar los productos del carrito al pedido
    $cartQuery = "
        SELECT p.nombre, dc.cantidad, (p.precio * dc.cantidad) AS subtotal
        FROM detalle_carrito dc
        JOIN producto p ON dc.id_producto = p.id_producto
        JOIN carrito c ON dc.id_carrito = c.id_carrito
        WHERE c.id_usuario = :user_id
    ";
    $cartStmt = $conn->prepare($cartQuery);
    $cartStmt->execute(['user_id' => $user_id]);
    $cartItems = $cartStmt->fetchAll(PDO::FETCH_ASSOC);

    foreach ($cartItems as $item) {
        $insertItem = "INSERT INTO order_items (order_id, product_name, quantity, subtotal) VALUES (:order_id, :product_name, :quantity, :subtotal)";
        $itemStmt = $conn->prepare($insertItem);
        $itemStmt->execute([
            'order_id' => $order_id,
            'product_name' => $item['nombre'],
            'quantity' => $item['cantidad'],
            'subtotal' => $item['subtotal']
        ]);
    }

    // Limpiar el carrito después de la compra
    $clearCart = "DELETE FROM detalle_carrito WHERE id_carrito = (SELECT id_carrito FROM carrito WHERE id_usuario = :user_id)";
    $clearCartStmt = $conn->prepare($clearCart);
    $clearCartStmt->execute(['user_id' => $user_id]);

    $conn->commit();

    // Generar el PDF del ticket de compra
    $pdf = new FPDF();
    $pdf->AddPage();
    $pdf->SetFont('Arial', 'B', 14);
    $pdf->Cell(0, 10, 'PCGateway - Purchase Receipt', 0, 1, 'C');
    $pdf->Ln(10);

    $pdf->SetFont('Arial', '', 12);
    $pdf->Cell(0, 10, "Order ID: $order_id", 0, 1);
    $pdf->Cell(0, 10, "Payment Method: $paymentMethod", 0, 1);
    $pdf->Ln(5);

    $pdf->Cell(0, 10, 'Order Details:', 0, 1);
    foreach ($cartItems as $item) {
        $pdf->Cell(0, 10, $item['nombre'] . ' x ' . $item['cantidad'] . ' - US$ ' . $item['subtotal'], 0, 1);
    }

    $pdfFileName = '../tickets/ticket_order_' . $order_id . '.pdf';
    $pdf->Output('F', $pdfFileName);

    echo json_encode(['success' => true, 'order_id' => $order_id, 'ticket_url' => $pdfFileName]);

} catch (Exception $e) {
    $conn->rollBack();
    echo json_encode(['success' => false, 'error' => $e->getMessage()]);
}