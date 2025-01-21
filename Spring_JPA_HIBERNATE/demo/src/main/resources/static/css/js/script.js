// Thêm người dùng mới
document.getElementById('add-user-form')?.addEventListener('submit', function (event) {
    event.preventDefault();

    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;

    fetch('/User', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ name, email })
    })
    .then(response => response.json())
    .then(data => {
        alert('Người dùng đã được thêm thành công!');
        window.location.href = 'index.html';
    })
    .catch(error => alert('Đã có lỗi xảy ra: ' + error));
});

// Lấy danh sách người dùng
window.onload = function () {
    fetch('/User')
    .then(response => response.json())
    .then(data => {
        const userList = document.getElementById('user-list');
        userList.innerHTML = '';
        data.forEach(user => {
            const row = document.createElement('tr');
            row.innerHTML = `
                <td>${user.id}</td>
                <td>${user.name}</td>
                <td>${user.email}</td>
                <td>
                    <a href="edit-user.html?id=${user.id}" class="btn">Sửa</a>
                    <button onclick="deleteUser(${user.id})" class="btn">Xóa</button>
                </td>
            `;
            userList.appendChild(row);
        });
    });
};

// Cập nhật thông tin người dùng
document.getElementById('edit-user-form')?.addEventListener('submit', function (event) {
    event.preventDefault();

    const id = document.getElementById('user-id').value;
    const name = document.getElementById('edit-name').value;
    const email = document.getElementById('edit-email').value;

    fetch(`/User/${id}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ name, email })
    })
    .then(response => response.json())
    .then(data => {
        alert('Người dùng đã được cập nhật!');
        window.location.href = 'index.html';
    })
    .catch(error => alert('Đã có lỗi xảy ra: ' + error));
});

// Lấy thông tin người dùng để chỉnh sửa
if (window.location.pathname === '/edit-user.html') {
    const urlParams = new URLSearchParams(window.location.search);
    const id = urlParams.get('id');

    fetch(`/User/${id}`)
    .then(response => response.json())
    .then(user => {
        document.getElementById('user-id').value = user.id;
        document.getElementById('edit-name').value = user.name;
        document.getElementById('edit-email').value = user.email;
    });
}

// Xóa người dùng
function deleteUser(id) {
    if (confirm('Bạn có chắc muốn xóa người dùng này không?')) {
        fetch(`/User/${id}`, {
            method: 'DELETE'
        })
        .then(response => {
            if (response.status === 204) {
                alert('Người dùng đã được xóa!');
                window.location.reload();
            }
        })
        .catch(error => alert('Đã có lỗi xảy ra: ' + error));
}
}