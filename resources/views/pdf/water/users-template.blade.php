<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>Lista de usuarios</title>

    <style>
        html {
            font-family: Arial, Helvetica, sans-serif;
            font-size: 11px;
        }

        th {
            border: 1px solid rgb(80, 80, 80);

            text-align: left
        }

        table {
            width: 100%;
        }

        td {
            border: 1px solid rgb(80, 80, 80);

        }

        /* td oven and even differente bg color */
        tr:nth-child(even) {
            background-color: #e9e9e9;
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



        .group {
            page-break-before: always;
        }

        .group:first-child {
            page-break-before: avoid;
        }

        .column_center {
            text-align: center;
        }

        .column_bold {
            font-weight: bold;
        }

        .group_name {
            font-size: 1.5em;
            font-weight: bold;
            margin-bottom: 0.5em;
            text-align: center;
        }

        .moth_cell {
            text-align: center;
            min-width: 30px;
        }
    </style>

</head>


<body>

    <main>

        @foreach ($groups as $group)
            <div class="group">
                <h1 class="group_name">
                    @if ($group['name'] == 'Con conexión')
                        USUARIOS DEL AGUA POTABLE
                    @else
                        {{ $group['name'] }}
                    @endif
                </h1>
                <table>
                    <thead>
                        <tr>
                            <th class="column_center">#</th>
                            <th>NOMBRE</th>
                            @foreach ($months as $month)
                                <th class="column_center moth_cell">{{ $month }}</th>
                            @endforeach
                        </tr>
                    </thead>
                    <tbody>
                        @for ($i = 0; $i < $group['rows']; $i++)
                            @if ($i < count($group['users']))
                                <tr class="row">
                                    <td class="column_center column_bold">

                                        {{ $group['users'][$i]['number'] }}</td>
                                    <td>
                                        {{ $group['users'][$i]['name'] }}</td>
                                    @foreach ($months as $month)
                                        <td class="column_center moth_cell">

                                        </td>
                                    @endforeach
                                </tr>
                            @else
                                <tr class="row">
                                    <td class="column_center column_bold">
                                        {{ $i + 1 }}
                                    </td>
                                    <td>
                                    </td>
                                    @foreach ($months as $month)
                                        <td class="column_center moth_cell">

                                        </td>
                                    @endforeach
                                </tr>
                            @endif
                        @endfor
                    </tbody>
                </table>
            </div>
        @endforeach

    </main>
</body>

</html>
