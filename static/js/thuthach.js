document.addEventListener('DOMContentLoaded', function() {
    const searchInput = document.getElementById('search');
    const tableBody = document.getElementById('contest-table-body');
    const rows = tableBody.getElementsByTagName('tr');

    searchInput.addEventListener('input', function() {
        const query = searchInput.value.toLowerCase();

        for (let row of rows) {
            const cells = row.getElementsByTagName('td');
            const contestName = cells[0].textContent.toLowerCase();

            if (contestName.includes(query)) {
                row.style.display = '';
            } else {
                row.style.display = 'none';
            }
        }
    });
});
