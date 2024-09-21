// Dữ liệu tài liệu mẫu
const files = [
    { title: "Tiền Giang 2012-2013", url: "/static/tainguyen/tiengiangs1.pdf", imageUrl: "/static/images/10.png" },
    { title: "Tiền Giang 2013-2014", url: "/static/tainguyen/tiengiangs2.pdf", imageUrl: "/static/images/10.png" },
    { title: "Tiền Giang 2014-2015", url: "/static/tainguyen/tiengiangs3.pdf", imageUrl: "/static/images/10.png" },
    { title: "Tiền Giang 2015-2016", url: "/static/tainguyen/tiengiangs4.pdf", imageUrl: "/static/images/10.png" },
    { title: "Tiền Giang 2016-2017", url: "/static/tainguyen/tiengiangs5.pdf", imageUrl: "/static/images/10.png" },
    { title: "Tiền Giang 2017-2018", url: "/static/tainguyen/tiengiangs6.pdf", imageUrl: "/static/images/10.png" },
    { title: "Tiền Giang 2018-2019", url: "/static/tainguyen/tiengiangs7.pdf", imageUrl: "/static/images/10.png" },

    { title: "Lai Vung 2014-2015", url: "/static/tainguyen/laivung81415.pdf", imageUrl: "/static/images/10.png" },
    { title: "Lai Vung 2015-2016", url: "/static/tainguyen/laivung81516.pdf", imageUrl: "/static/images/10.png" },
    { title: "Lai Vung 2014-2015", url: "/static/tainguyen/laivung91415.pdf", imageUrl: "/static/images/10.png" },
    { title: "Lai Vung 2015-2016", url: "/static/tainguyen/laivung91516.pdf", imageUrl: "/static/images/10.png" },
    { title: "Lai Vung 2016-2017", url: "/static/tainguyen/laivung91617.pdf", imageUrl: "/static/images/10.png" },

    { title: "Tỉnh .Đồng Tháp 2012-2013", url: "/static/tainguyen/hsgtinh1213.pdf", imageUrl: "/static/images/10.png" },
    { title: "Tỉnh .Đồng Tháp 2013-2014", url: "/static/tainguyen/hsgtinh1314.pdf", imageUrl: "/static/images/10.png" },
    { title: "Tỉnh .Đồng Tháp 2014-2015", url: "/static/tainguyen/hsgtinh1415.pdf", imageUrl: "/static/images/10.png" },
    { title: "Tỉnh .Đồng Tháp 2015-2016", url: "/static/tainguyen/hsgtinh1516.pdf", imageUrl: "/static/images/10.png" },
    { title: "Tỉnh .Đồng Tháp 2016-2017", url: "/static/tainguyen/hsgtinh1617.pdf", imageUrl: "/static/images/10.png" },
    { title: "Tỉnh .Đồng Tháp 2017-2018", url: "/static/tainguyen/hsgtinh1718.pdf", imageUrl: "/static/images/10.png" },
    { title: "Tỉnh .Đồng Tháp 2018-2019", url: "/static/tainguyen/hsgtinh1819.pdf", imageUrl: "/static/images/10.png" },
    { title: "Tỉnh .Đồng Tháp 2020-2021", url: "/static/tainguyen/hsgtinh2021.pdf", imageUrl: "/static/images/10.png" },

    { title: "Ebook tuyển tập đề", url: "/static/tainguyen/ebooktuyentapde.pdf ", imageUrl: "/static/images/10.png" },
    
    { title: "Hàm cơ bản [STRING]", url: "/static/tainguyen/hamcobanstring.pdf", imageUrl: "/static/images/10.png" },
    { title: "Các bài toán về quy hoạch động", url: "/static/tainguyen/cacthuattoantoiuu.pdf", imageUrl: "/static/images/10.png" },
    { title: "Giáo trính Lập trình [TP.HCM]", url: "/static/tainguyen/giaotrinhlaptrinhhcm.pdf", imageUrl: "/static/images/10.png" },
    { title: "1000 bài tập về lưu đồ thuật toán", url: "/static/tainguyen/1000baitap.pdf", imageUrl: "/static/images/10.png" },
    { title: "300 bài code thiếu nhi", url: "/static/tainguyen/300bai.pdf", imageUrl: "/static/images/10.png" },
    { title: "Tuyển tập 40 đề thi HSG", url: "/static/tainguyen/40hsgtinh.pdf", imageUrl: "/static/images/10.png" },
    { title: "", url: "", imageUrl: "/static/images/10.png" },
    { title: "", url: "", imageUrl: "/static/images/10.png" },
    { title: "", url: "", imageUrl: "/static/images/10.png" },
    { title: "", url: "", imageUrl: "/static/images/10.png" },
    { title: "", url: "", imageUrl: "/static/images/10.png" },
    { title: "", url: "", imageUrl: "/static/images/10.png" },
    { title: "", url: "", imageUrl: "/static/images/10.png" },
    { title: "", url: "", imageUrl: "/static/images/10.png" },

    // Thêm các file khác ở đây
];

// Hàm tạo HTML cho các ô tài liệu
function createFileItem(file) {
    return `
        <div class="file-item" data-url="${file.url}">
            <img src="${file.imageUrl}" alt="${file.title} preview">
            <h3>${file.title}</h3>
            <a href="${file.url}" download>Download</a>
            <br>
            <button class="view-button">View PDF</button>
        </div>
    `;
}


// Thêm các ô tài liệu vào phần tử file-grid
document.addEventListener('DOMContentLoaded', function () {
    const fileGrid = document.getElementById('fileGrid');
    fileGrid.innerHTML = files.map(createFileItem).join('');

    // Xử lý sự kiện click để xem PDF
    fileGrid.addEventListener('click', function (event) {
        if (event.target.classList.contains('view-button')) {
            const fileItem = event.target.closest('.file-item');
            const url = fileItem.getAttribute('data-url');
            openPdfInNewTab(url);
        }
    });
});

// Hàm mở PDF trong tab mới
function openPdfInNewTab(url) {
    window.open(url, '_blank');
}

// Tìm kiếm tài liệu
const searchInput = document.getElementById('searchInput');
searchInput.addEventListener('input', function () {
    const query = searchInput.value.toLowerCase();
    const items = fileGrid.querySelectorAll('.file-item');
    items.forEach(item => {
        const title = item.querySelector('h3').textContent.toLowerCase();
        item.style.display = title.includes(query) ? '' : 'none';
    });
});

