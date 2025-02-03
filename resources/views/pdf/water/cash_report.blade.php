<!DOCTYPE html>
<html lang="en">


<?php

function formatCurrency($value)
{
    return "$" . number_format($value, 2, ',', '.');
}
?>

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>Reporte caja</title>

    <style>
        html {
            font-family: Arial, Helvetica, sans-serif;
            font-size: 11px;
        }

        .table {
            font-family: Arial, Helvetica, sans-serif;
            border-collapse: collapse;
            width: 100%;
        }

        .table td,
        .table th {
            border: 1px solid #ddd;
            padding: 8px;
        }

        .income {
            background-color: #e8ffed;
        }

        .expense {
            background-color: #fce7e9;
        }

        .table th {
            padding-top: 12px;
            padding-bottom: 12px;
            text-align: left;
            font-size: 12px;
        }

        @page {
            margin: 0cm 0cm;
        }

        body {
            margin-top: 1cm;
            margin-bottom: 1cm;
            margin-left: 1cm;
            margin-right: 1cm;
        }

        .rowData {
            display: flex;
            justify-content: space-between;
        }
    </style>

</head>


<body>

    <main>

        <h1 class="group_name">Reporte de caja</h1>

        <table style="width: 100%" class="table">
            <tr>
                <td>
                    <b>Total en caja:</b>
                </td>
                <td>
                    {{ formatCurrency($total) }}
                </td>
                <td>
                    <b>Cantidad movimientos:</b>
                </td>
                <td>
                    {{ $total_items }}
                </td>
            </tr>
            <tr>
                <td>
                    <b>Ingresos:</b>
                </td>
                <td>
                    {{ formatCurrency($incomes) }}
                </td>
                <td>
                    <b>Cantidad ingresos:</b>
                </td>
                <td>
                    {{ $incomes_count }}
                </td>
            </tr>
            <tr>
                <td>
                    <b>Egresos:</b>
                </td>
                <td>
                    {{ formatCurrency($expenses) }}
                </td>
                <td>
                    <b>Cantidad egresos:</b>
                </td>
                <td>
                    {{ $expenses_count }}
                </td>
            </tr>
        </table>

        <br>
        <h2>Movimientos</h2>
        <table style="width: 100%" class="table">
            <thead>
                <tr>
                    <th>Fecha</th>
                    <th>Concepto</th>
                    <th>
                        Balance inicial
                    </th>
                    <th>Monto</th>
                    <th>
                        Balance final
                    </th>

                </tr>
            </thead>
            <tbody>
                @foreach ($movements as $movement)
                    <tr class="{{ $movement->amount > 0 == 'income' ? 'income' : 'expense' }}">
                        {{-- Format date --}}
                        <td>{{ date('d/m/Y', strtotime($movement->created_at)) }}</td>
                        <td>{{ $movement->description }}</td>
                        <td>{{ formatCurrency($movement->last_total_amount) }}</td>
                        <td>{{ formatCurrency($movement->amount) }}</td>
                        <td>{{ formatCurrency($movement->last_total_amount + $movement->amount) }}</td>

                    </tr>
                @endforeach
            </tbody>
        </table>
        <br>
        <div style="text-align: right;">
            <b>Fecha de emisión:</b> {{ date('d/m/Y H:i:s') }}

        </div>
    </main>
</body>

</html>
