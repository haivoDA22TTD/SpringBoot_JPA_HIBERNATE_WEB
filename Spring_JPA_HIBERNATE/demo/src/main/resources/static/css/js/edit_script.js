// Hàm để lấy thông tin người dùng từ API và điền vào form
function loadUserData(id) {
    fetch(`/User/${id}`)
    .then(response => response.json())
    .then(user => {
        document.getElementById('user-id').value = user.id;
        document.getElementById('name').value = user.name;
        document.getElementById('email').value = user.email;
    })
    .catch(error => console.error('Lỗi khi lấy thông tin người dùng:', error));
}

// Lắng nghe sự kiện form submit để gửi yêu cầu PUT
document.getElementById('edit-user-form').addEventListener('submit', function (event) {
    event.preventDefault();  // Ngừng form gửi đi để bạn xử lý thủ công

    const id = document.getElementById('user-id').value;
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;

    fetch(`/User/${id}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ name, email })
    })
    .then(response => response.json())
    .then(data => {
        alert('Thông tin người dùng đã được cập nhật!');
        window.location.href = 'index.html';  // Quay lại trang danh sách người dùng
    })
    .catch(error => {
        alert('Đã có lỗi khi cập nhật người dùng!');
        console.error('Lỗi khi cập nhật người dùng:', error);
    });
});

// Lấy id người dùng từ URL và tải thông tin
const urlParams = new URLSearchParams(window.location.search);
const userId = urlParams.get('id');
if (userId) {
    loadUserData(userId);
}
