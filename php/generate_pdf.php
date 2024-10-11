<?php
require('../libraries/fpdf186/fpdf.php');
include 'connection.php';

$data = json_decode(file_get_contents('php://input'), true);

if (!isset($data['categories'])) {
    echo json_encode(['error' => 'No se seleccionaron categorías.']);
    exit;
}

$categories = $data['categories'];

try {
    // Obtener el nombre de las categorías seleccionadas
    $categoryPlaceholders = implode(',', array_fill(0, count($categories), '?'));
    $categoryStmt = $conn->prepare("SELECT id_categoría, nombre FROM categoría WHERE id_categoría IN ($categoryPlaceholders)");
    $categoryStmt->execute($categories);
    $categoryNames = $categoryStmt->fetchAll(PDO::FETCH_ASSOC);

    if (count($categoryNames) === 0) {
        echo json_encode(['error' => 'No se encontraron categorías seleccionadas.']);
        exit;
    }

    // Crear el PDF con FPDF
    $pdf = new FPDF();
    $pdf->AddPage();
    $pdf->SetFont('Arial', 'B', 16);
    $pdf->Cell(0, 10, utf8_decode('Catálogo de Productos'), 0, 1, 'C');
    
    foreach ($categoryNames as $category) {
        $categoryId = $category['id_categoría'];
        $categoryName = $category['nombre'];

        // Mostrar el nombre de la categoría
        $pdf->Ln(10);
        $pdf->SetFont('Arial', 'B', 14);
        $pdf->Cell(0, 10, utf8_decode('Categoría: ' . $categoryName), 0, 1);

        // Obtener los productos de la categoría actual
        $productStmt = $conn->prepare('SELECT nombre, descripcion, precio FROM producto WHERE categoria = ?');
        $productStmt->execute([$categoryId]);
        $products = $productStmt->fetchAll(PDO::FETCH_ASSOC);

        if (count($products) === 0) {
            $pdf->SetFont('Arial', '', 12);
            $pdf->Cell(0, 10, utf8_decode('No hay productos en esta categoría.'), 0, 1);
            continue;
        }

        // Mostrar los productos de la categoría
        foreach ($products as $product) {
            $pdf->Ln(5);

            // Nombre del producto
            $pdf->SetFont('Arial', 'B', 12);
            $pdf->Cell(0, 10, utf8_decode('Producto: ' . $product['nombre']), 0, 1);

            // Descripción en negrita
            $pdf->SetFont('Arial', 'B', 10);
            $pdf->MultiCell(0, 10, utf8_decode('Descripción: '));

            // Texto de la descripción en fuente normal
            $pdf->SetFont('Arial', '', 10);
            $pdf->MultiCell(0, 10, utf8_decode($product['descripcion']));

            // Precio en negrita
            $pdf->SetFont('Arial', 'B', 10);
            $pdf->Cell(0, 10, utf8_decode('Precio: $' . $product['precio']), 0, 1);
        }
    }

    // Guardar el archivo PDF en el directorio
    $file = __DIR__ . '/pdf/catalogo_' . time() . '.pdf';
    $pdf->Output('F', $file);

    // Responder con la URL del archivo generado
    echo json_encode(['success' => true, 'pdf_url' => '/pcgateway/php/pdf/' . basename($file)]);

} catch (PDOException $e) {
    // Manejar errores de la base de datos
    echo json_encode(['error' => $e->getMessage()]);
}
?>