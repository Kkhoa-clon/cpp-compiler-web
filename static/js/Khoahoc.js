document.addEventListener('DOMContentLoaded', () => {
    const courseContainer = document.getElementById('courseContainer');
    const searchInput = document.getElementById('searchInput');
    const searchButton = document.getElementById('searchButton');

    // Mảng chứa các khóa học
    let courses = [
        {
            title: 'Giới Thiệu',
            description: 'lộ trình [cơ bản - nâng cao]',
            videoId: 'hu20Ld4Yf-A', // Thay thế bằng video ID thực tế
            thumbnail: 'https://img.youtube.com/vi/hu20Ld4Yf-A/maxresdefault.jpg'
        },
        {
            title: 'Toán Tử',
            description: 'các toán tử [C++]',
            videoId: 'y-_fNgvSfjc', // Thay thế bằng video ID thực tế
            thumbnail: 'https://img.youtube.com/vi/y-_fNgvSfjc/maxresdefault.jpg'
        },
        {
            title: 'Cấu Trúc Rẽ Nhánh',
            description: 'cấu trúc rẽ nhánh [C++]',
            videoId: 'QH-nyFW3c0s', // Thay thế bằng video ID thực tế
            thumbnail: 'https://img.youtube.com/vi/QH-nyFW3c0s/maxresdefault.jpg'
        },
        {
            title: 'Bài Tập',
            description: 'Cấu trúc rẽ nhánh [C++]',
            videoId: '_w1vLXiQPEg', // Thay thế bằng video ID thực tế
            thumbnail: 'https://img.youtube.com/vi/_w1vLXiQPEg/maxresdefault.jpg'
        },
        {
            title: 'Vòng Lặp',
            description: 'các loại vòng lặp [C++]',
            videoId: 'O0Q5K0m6mvY', // Thay thế bằng video ID thực tế
            thumbnail: 'https://img.youtube.com/vi/O0Q5K0m6mvY/maxresdefault.jpg'
        },
        {
            title: 'Hàm',
            description: 'cơ bản về hàm [C++]',
            videoId: 'UkX6o68LNMs', // Thay thế bằng video ID thực tế
            thumbnail: 'https://img.youtube.com/vi/UkX6o68LNMs/maxresdefault.jpg'
        },
        {
            title: 'macro',
            description: 'định nghĩa [C++]',
            videoId: 'K5G5uzJbb-4', // Thay thế bằng video ID thực tế
            thumbnail: 'https://img.youtube.com/vi/K5G5uzJbb-4/maxresdefault.jpg'
        },
        {
            title: 'Độ Phức Tạp',
            description: 'phân tích độ phức tạp [C++]',
            videoId: '0W060mNbi40', // Thay thế bằng video ID thực tế
            thumbnail: 'https://img.youtube.com/vi/0W060mNbi40/maxresdefault.jpg'
        },
        {
            title: 'Mảng 1 Chiều',
            description: 'array 1D [C++]',
            videoId: 'M3v7Ie9hu0s', // Thay thế bằng video ID thực tế
            thumbnail: 'https://img.youtube.com/vi/M3v7Ie9hu0s/maxresdefault.jpg'
        },
        {
            title: 'Bài Tập',
            description: 'bài tập về mảng 1 chiều [1]',
            videoId: '96vSM-dPwyg', // Thay thế bằng video ID thực tế
            thumbnail: 'https://img.youtube.com/vi/96vSM-dPwyg/maxresdefault.jpg'
        },
        {
            title: 'Bài Tập',
            description: 'bài tập về mảng 1 chiều [2]',
            videoId: 'cYU6OHZtHks', // Thay thế bằng video ID thực tế
            thumbnail: 'https://img.youtube.com/vi/cYU6OHZtHks/maxresdefault.jpg'
        },
        {
            title: 'Mảng 2 Chiều',
            description: 'array 2D [C++]',
            videoId: '1NTr9eA9mFI', // Thay thế bằng video ID thực tế
            thumbnail: 'https://img.youtube.com/vi/1NTr9eA9mFI/maxresdefault.jpg'
        },
        {
            title: 'Mảng Cộng Dồn',
            description: 'truy vẫn và tổng tĩnh [C++]',
            videoId: 'KxQkpu842rc', // Thay thế bằng video ID thực tế
            thumbnail: 'https://img.youtube.com/vi/KxQkpu842rc/maxresdefault.jpg'
        },
        {
            title: 'Bài Tập',
            description: 'bài tập về mảng 2 chiều [1]',
            videoId: 'O0loDVOxx-M', // Thay thế bằng video ID thực tế
            thumbnail: 'https://img.youtube.com/vi/O0loDVOxx-M/maxresdefault.jpg'
        },
        {
            title: 'Bài Tập',
            description: 'bài tập về mảng 2 chiều [2]',
            videoId: 'XKxByfH9ci4', // Thay thế bằng video ID thực tế
            thumbnail: 'https://img.youtube.com/vi/XKxByfH9ci4/maxresdefault.jpg'
        },
        {
            title: 'String',
            description: 'xâu ký tự [C++]',
            videoId: 'AwBY3AkQO3M', // Thay thế bằng video ID thực tế
            thumbnail: 'https://img.youtube.com/vi/AwBY3AkQO3M/maxresdefault.jpg'
        },
        {
            title: 'Bài Tập',
            description: 'bài tập về mảng 2 chiều [3]',
            videoId: 'y-ndOttz_Sk', // Thay thế bằng video ID thực tế
            thumbnail: 'https://img.youtube.com/vi/y-ndOttz_Sk/maxresdefault.jpg'
        },
        {
            title: 'Vector & Iterator',
            description: 'siêu mảng động [STL]',
            videoId: '053Tcz4omzk', // Thay thế bằng video ID thực tế
            thumbnail: 'https://img.youtube.com/vi/053Tcz4omzk/maxresdefault.jpg'
        },
        {
            title: 'Pair',
            description: 'kiểu dữ liệu pair [STL]',
            videoId: '7mJsTe7RtgQ', // Thay thế bằng video ID thực tế
            thumbnail: 'https://img.youtube.com/vi/7mJsTe7RtgQ/maxresdefault.jpg'
        },
        {
            title: 'Set',
            description: 'các loại set [STL]',
            videoId: 'lQ0KTlXDRR0', // Thay thế bằng video ID thực tế
            thumbnail: 'https://img.youtube.com/vi/lQ0KTlXDRR0/maxresdefault.jpg'
        },
        {
            title: 'Map',
            description: 'các loại map [STL]',
            videoId: '5j1FTGu6HlE', // Thay thế bằng video ID thực tế
            thumbnail: 'https://img.youtube.com/vi/5j1FTGu6HlE/maxresdefault.jpg'
        },
        {
            title: 'Bài Tập',
            description: 'bài tập Set & Map [STL]',
            videoId: 'JcSs5ryBAKg', // Thay thế bằng video ID thực tế
            thumbnail: 'https://img.youtube.com/vi/JcSs5ryBAKg/maxresdefault.jpg'
        },
        {
            title: 'Tìm Kiếm Nhị Phân',
            description: 'tìm kiếm nhị phân [algorithm]',
            videoId: 'dB2DWSKGLj8', // Thay thế bằng video ID thực tế
            thumbnail: 'https://img.youtube.com/vi/dB2DWSKGLj8/maxresdefault.jpg'
        },
        {
            title: 'Thuật Toán Sắp Xếp',
            description: 'các loại sắp xếp [C++]',
            videoId: '8GRA1EMUaSI', // Thay thế bằng video ID thực tế
            thumbnail: 'https://img.youtube.com/vi/8GRA1EMUaSI/maxresdefault.jpg'
        },
        {
            title: 'Sắp Xếp Trộn',
            description: 'megre sort [C++]',
            videoId: 'hTHO1Mprj8g', // Thay thế bằng video ID thực tế
            thumbnail: 'https://img.youtube.com/vi/hTHO1Mprj8g/maxresdefault.jpg'
        },
        {
            title: 'Sắp Xếp Vun Đống',
            description: 'heap sort [C++]',
            videoId: 'XFI96Z7i3LE', // Thay thế bằng video ID thực tế
            thumbnail: 'https://img.youtube.com/vi/XFI96Z7i3LE/maxresdefault.jpg'
        },
        {
            title: 'Sắp Xếp Nhanh',
            description: 'quick sort [C++]',
            videoId: 'eT9Epyf0XLM', // Thay thế bằng video ID thực tế
            thumbnail: 'https://img.youtube.com/vi/eT9Epyf0XLM/maxresdefault.jpg'
        },
        {
            title: 'Hàm Thông Dụng',
            description: 'algorithm [C++]',
            videoId: 'v7KL3b2-Zlo', // Thay thế bằng video ID thực tế
            thumbnail: 'https://img.youtube.com/vi/v7KL3b2-Zlo/maxresdefault.jpg'
        },
        {
            title: 'Bài Tập',
            description: 'tìm kiếm & sắp xếp [1]',
            videoId: 'o11f2d7q_Ew', // Thay thế bằng video ID thực tế
            thumbnail: 'https://img.youtube.com/vi/o11f2d7q_Ew/maxresdefault.jpg'
        },
        {
            title: 'Bài Tập',
            description: 'tìm kiếm & sắp xếp [2]',
            videoId: 'OztBjGkXUg0', // Thay thế bằng video ID thực tế
            thumbnail: 'https://img.youtube.com/vi/OztBjGkXUg0/maxresdefault.jpg'
        },
        {
            title: 'Số và Toán',
            description: 'lý thuyết [1]',
            videoId: 'rd7lhHLuRfI', // Thay thế bằng video ID thực tế
            thumbnail: 'https://img.youtube.com/vi/rd7lhHLuRfI/maxresdefault.jpg'
        },
        {
            title: 'Số và Toán',
            description: 'lý thuyết [2]',
            videoId: '0s545mDND18', // Thay thế bằng video ID thực tế
            thumbnail: 'https://img.youtube.com/vi/0s545mDND18/maxresdefault.jpg'
        },
        {
            title: 'Số và Toán',
            description: 'lý thuyết [3]',
            videoId: '8mzj-YjS49Q', // Thay thế bằng video ID thực tế
            thumbnail: 'https://img.youtube.com/vi/8mzj-YjS49Q/maxresdefault.jpg'
        },
        {
            title: 'Đệ Quy',
            description: 'hàm đệ quy [C++]',
            videoId: 'eQ3VpTtc9lE', // Thay thế bằng video ID thực tế
            thumbnail: 'https://img.youtube.com/vi/eQ3VpTtc9lE/maxresdefault.jpg'
        },
        {
            title: 'Bài Tập',
            description: 'bài tập xâu ký tự [1]',
            videoId: 'mJQgnN1P97Q', // Thay thế bằng video ID thực tế
            thumbnail: 'https://img.youtube.com/vi/mJQgnN1P97Q/maxresdefault.jpg'
            
        },
        {
            title: 'Bài Tập',
            description: 'bài tập xâu ký tự [2]',
            videoId: 'I2B6UDSpvx4', // Thay thế bằng video ID thực tế
            thumbnail: 'https://img.youtube.com/vi/I2B6UDSpvx4/maxresdefault.jpg'
        },
        {
            title: 'Bài Tập',
            description: 'bài tập xâu ký tự [3]',
            videoId: '91cY1TnJmv4', // Thay thế bằng video ID thực tế
            thumbnail: 'https://img.youtube.com/vi/91cY1TnJmv4/maxresdefault.jpg'
        },
        {
            title: 'Sinh Kế Tiếp',
            description: 'thuật toán sinh kế tiếp [C++]',
             videoId: 'lkhRIjrAtO8', // Thay thế bằng video ID thực tế
            thumbnail: 'https://img.youtube.com/vi/lkhRIjrAtO8/maxresdefault.jpg'
        },
        {
            title: 'Ngắn Xếp',
            description: 'dữ liệu ngắn xếp [C++]',
            videoId: 'MQZ1TH0l7sk', // Thay thế bằng video ID thực tế
            thumbnail: 'https://img.youtube.com/vi/MQZ1TH0l7sk/maxresdefault.jpg'
        },
        {
            title: 'Bài Tập',
            description: 'BT sinh kế tiếp [C++]',
            videoId: 'OEtmPRXhEwA', // Thay thế bằng video ID thực tế
            thumbnail: 'https://img.youtube.com/vi/OEtmPRXhEwA/maxresdefault.jpg'
        },
        {
            title: 'Hàng Đợi',
            description: 'cấu trúc hàng đợi [C++]', 
            videoId: 'gYG70ULXbW4', // Thay thế bằng video ID thực tế
            thumbnail: 'https://img.youtube.com/vi/gYG70ULXbW4/maxresdefault.jpg'
        },
        {
            title: 'Hàng Đợi 2 Đầu',
            description: 'cấu trúc hàng đợi 2 đầu [C++]',
            videoId: 'MoD_cqJ9s6g', // Thay thế bằng video ID thực tế
            thumbnail: 'https://img.youtube.com/vi/MoD_cqJ9s6g/maxresdefault.jpg'
            
        },
        {
            title: 'Hàng Đợi Ưu Tiên',
            description: 'cấu trúc hàng đợi UT [C++]',
            videoId: 'DRcAJNhtwbY', // Thay thế bằng video ID thực tế
            thumbnail: 'https://img.youtube.com/vi/DRcAJNhtwbY/maxresdefault.jpg'
            
        },
        {
            title: 'Cửa Sổ Trược',
            description: 'slding window [C++]',
            videoId: 'XUx3iJVPdxA', // Thay thế bằng video ID thực tế
            thumbnail: 'https://img.youtube.com/vi/XUx3iJVPdxA/maxresdefault.jpg'
        },
        {
            title: '2 Con Trỏ',
            description: 'two pointer [C++]',
            videoId: 'PPyw2vp6SIU', // Thay thế bằng video ID thực tế
            thumbnail: 'https://img.youtube.com/vi/PPyw2vp6SIU/maxresdefault.jpg'
        },
        {
            title: 'Toán Tử Bit',
            description: 'bitwide [C++]',
            videoId: 'sfa7X7TnBzk', // Thay thế bằng video ID thực tế
            thumbnail: 'https://img.youtube.com/vi/sfa7X7TnBzk/maxresdefault.jpg'
        },
        {
            title: 'Struct',
            description: 'kiểu cấu trúc struct [C++]',
            videoId: 'F2OplwShEdk', // Thay thế bằng video ID thực tế
            thumbnail: 'https://img.youtube.com/vi/F2OplwShEdk/maxresdefault.jpg'
        },
        {
            title: 'Bài tập',
            description: 'bài tập về struct [1]',
            videoId: 'CO3b8Ns3_IU', // Thay thế bằng video ID thực tế
            thumbnail: 'https://img.youtube.com/vi/CO3b8Ns3_IU/maxresdefault.jpg'
        },
        {
            title: 'Bài Tập',
            description: 'bài tập về struct [2]',
            videoId: 'F0bAzZ_LLVk', // Thay thế bằng video ID thực tế
            thumbnail: 'https://img.youtube.com/vi/F0bAzZ_LLVk/maxresdefault.jpg'
        },
        {
            title: 'Đối tượng OOP',
            description: 'LT hướng đối tượng [C++]',
            videoId: 'L-BabT96Zmk', // Thay thế bằng video ID thực tế
            thumbnail: 'https://img.youtube.com/vi/L-BabT96Zmk/maxresdefault.jpg'
        },
        {
            title: 'Bài Tập',
            description: 'BT hướng đối tượng [C++]',
            videoId: 'i7qCVd3HmeE', // Thay thế bằng video ID thực tế
            thumbnail: 'https://img.youtube.com/vi/i7qCVd3HmeE/maxresdefault.jpg'
        },
        {
            title: 'Danh sách liên kết',
            description: 'liên kết Đơn & Đôi [C++]',
            videoId: 'mdG5TEiJTx8', // Thay thế bằng video ID thực tế
            thumbnail: 'https://img.youtube.com/vi/mdG5TEiJTx8/maxresdefault.jpg'  
        },
        {
            title: 'Quay Lui Nhánh Cận',
            description: 'thuật toán QL & NC [C++]',
            videoId: 'efpaZznImN4', // Thay thế bằng video ID thực tế
            thumbnail: 'https://img.youtube.com/vi/efpaZznImN4/maxresdefault.jpg'
        },
        {
            title: 'Test 1',
            description: 'chữa đề thi cuối kỳ [PTIT]',
            videoId: 'oaXJ2-oM6O0', // Thay thế bằng video ID thực tế
            thumbnail: 'https://img.youtube.com/vi/oaXJ2-oM6O0/maxresdefault.jpg' 
        },
        {
            title: 'Test 2',
            description: 'chữa đề thi cuối kỳ [PTIT]',
            videoId: '7JSySsbE_24', // Thay thế bằng video ID thực tế
            thumbnail: 'https://img.youtube.com/vi/7JSySsbE_24/maxresdefault.jpg'          
        },
        {
            title: 'Test 3',
            description: 'chữa đề thi cuối kỳ [PTIT]',
            videoId: 'NiRJlLD8MUU', // Thay thế bằng video ID thực tế
            thumbnail: 'https://img.youtube.com/vi/NiRJlLD8MUU/maxresdefault.jpg'       
        },
        {
            title: 'Test 4',
            description: 'chữa đề thi cuối kỳ [PTIT]',
            videoId: 'dgXsoIhQoKM', // Thay thế bằng video ID thực tế
            thumbnail: 'https://img.youtube.com/vi/dgXsoIhQoKM/maxresdefault.jpg'  
        },
        {
            title: 'Bài Tập',
            description: 'bài tập mảng 1 chiều [C++]',
            videoId: '9wHKG3jvDfA', // Thay thế bằng video ID thực tế
            thumbnail: 'https://img.youtube.com/vi/9wHKG3jvDfA/maxresdefault.jpg'
        },
        {
            title: 'Final Test 1',
            description: 'giải bài tập [1]',
            videoId: 'ho6qkfCLQkw', // Thay thế bằng video ID thực tế
            thumbnail: 'https://img.youtube.com/vi/ho6qkfCLQkw/maxresdefault.jpg'
        },
        {
            title: 'Final Test 2',
            description: 'giải bài tập [2]',
            videoId: 'qOX-pcZOczQ', // Thay thế bằng video ID thực tế
            thumbnail: 'https://img.youtube.com/vi/qOX-pcZOczQ/maxresdefault.jpg'
        },
        {
            title: 'For Each',
            description: 'BT mảng 1 chiều và for each [C++]',
            videoId: 'bpVDZwsi-JM', // Thay thế bằng video ID thực tế
            thumbnail: 'https://img.youtube.com/vi/bpVDZwsi-JM/maxresdefault.jpg'
            
        },
        {
            title: 'Nhị phân & Đệ Quy',
            description: 'tìm kiếm nhị phân [C++]',
            videoId: 'f0hY9Eh0pKg', // Thay thế bằng video ID thực tế
            thumbnail: 'https://img.youtube.com/vi/f0hY9Eh0pKg/maxresdefault.jpg'
        },
    ];

    function createCourseCard(course) {
        return `
            <div class="course-card">
                <img src="${course.thumbnail}" alt="${course.title}">
                <div class="content">
                    <h2>${course.title}</h2>
                    <p>${course.description}</p>
                    <a href="https://www.youtube.com/watch?v=${course.videoId}" target="_blank" id="view-button" >Xem Video</a>
                </div>
            </div>
        `;
    }

    function loadCourses(coursesToDisplay) {
        if (coursesToDisplay.length === 0) {
            courseContainer.innerHTML = '<p>Không tìm thấy khóa học nào.</p>';
        } else {
            courseContainer.innerHTML = coursesToDisplay.map(createCourseCard).join('');
        }
    }
    

    function searchCourses() {
        const query = searchInput.value.toLowerCase();
        const filteredCourses = courses.filter(course => 
            course.title.toLowerCase().includes(query) ||
            course.description.toLowerCase().includes(query)
        );
        loadCourses(filteredCourses);
    }

    searchInput.addEventListener('keyup', searchCourses);


    // Tải danh sách khóa học khi trang được tải
    loadCourses(courses);

    function openNav() {
        document.getElementById("sidebar").style.width = "250px";
        document.getElementById("main").style.marginLeft = "250px";
    }
    function closeNav() {
        document.getElementById("sidebar").style.width = "0";
        document.getElementById("main").style.marginLeft = "0";
    }
});
