<?php
session_start();
require_once 'connection.php';
require '../libraries/fpdf186/fpdf.php';

if (!isset($_SESSION['user_id'])) {
    die('User not logged in');
}

$id_usuario = $_SESSION['user_id'];

try {
    $stmt = $conn->prepare('
        SELECT p.id_pedido, p.total, p.productos, p.fecha
        FROM pedido p
        WHERE p.id_usuario = ? AND p.estado = "pendiente"
        ORDER BY p.fecha DESC LIMIT 1
    ');
    $stmt->execute([$id_usuario]);
    $pedido = $stmt->fetch(PDO::FETCH_ASSOC);

    if (!$pedido) {
        die('No pending order found');
    }

    // Datos del pedido
    $orderId = $pedido['id_pedido'];
    $total = $pedido['total'];
    $productos = json_decode($pedido['productos'], true);

    // Crear el PDF
    $pdf = new FPDF();
    $pdf->AddPage();
    $pdf->SetFont('Arial', 'B', 14);

    // Encabezado del ticket
    $pdf->Cell(0, 10, 'Ticket de Compra - PCGateway', 0, 1, 'C');
    $pdf->Ln(10);

    // Información del pedido
    $pdf->SetFont('Arial', '', 12);
    $pdf->Cell(0, 10, 'Order ID: ' . $orderId, 0, 1);
    $pdf->Cell(0, 10, 'Fecha: ' . $pedido['fecha'], 0, 1);
    $pdf->Ln(5);

    // Lista de productos (reemplazando '×' por 'x')
    foreach ($productos as $producto) {
        $producto_texto = $producto['nombre'] . ' x ' . $producto['cantidad'] . ' - $' . $producto['subtotal'];
        $pdf->MultiCell(0, 10, $producto_texto, 0, 'L');
    }

    // Total
    $pdf->Ln(10);
    $pdf->SetFont('Arial', 'B', 12);
    $pdf->Cell(0, 10, 'Total: $' . $total, 0, 1);

    // Salida del PDF
    $pdf->Output('D', 'ticket_de_compra.pdf');
} catch (PDOException $e) {
    echo 'Error retrieving order summary: ' . $e->getMessage();
}
?>