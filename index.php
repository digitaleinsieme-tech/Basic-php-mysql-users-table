<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Users</title>
    <link rel="stylesheet" href="./css/index.css">

    <script type="module" src="./js/users/get-users.js" defer></script>
</head>

<body>
    <main>
        <h1>Ajax Users</h1>

<p class="tools">
    <img class="btn-mod" title="add user" src="./img/add-user.png">
</p>

<table id="table-users">
    <thead>
        <tr>
            <th>ID<img class="btn-mod sort" data-field="id" src="./img/sort.png"></th>
            <th>Name<img class="btn-mod sort" data-field="name" src="./img/sort.png"></th>
            <th>Last-Name<img class="btn-mod sort" data-field="lastname" src="./img/sort.png"></th>
            <th>Email<img class="btn-mod sort" data-field="email" src="./img/sort.png"></th>
            <th>Edit/Delete</th>
        </tr>
    </thead>

    <tbody></tbody>
</table>


    </main>



</body>
</html>