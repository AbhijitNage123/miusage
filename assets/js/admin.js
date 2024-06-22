// document.addEventListener('DOMContentLoaded', function () {
// 	document.getElementById('refresh-data').addEventListener('click', function () {
// 		fetch(`${ajaxurl}?action=miusage_get_data`)
// 			.then(response => response.json())
// 			.then(data => {
// 				if (data.success) {
// 					let tableHtml = '<table>';
// 					data.data.forEach(item => {
// 						tableHtml += `<tr><td>${item.column1}</td><td>${item.column2}</td></tr>`;
// 					});
// 					tableHtml += '</table>';
// 					document.getElementById('data-table').innerHTML = tableHtml;
// 				}
// 			})
// 			.catch(error => console.error('Error fetching data:', error));
// 	});
// });

document.addEventListener('DOMContentLoaded', function () {
	const refreshButton = document.getElementById('refresh-data');
	const dataTable = document.getElementById('data-table');

	refreshButton.addEventListener('click', function () {
		fetch(ajaxurl + '?action=miusage_get_data')
			.then(response => response.json())
			.then(response => {
				if (response.success) {
					const data = response.data.data;
					const headers = data.headers;
					const rows = data.rows;

					let table = '<table class="widefat fixed" cellspacing="0"><thead><tr>';
					headers.forEach(header => {
						table += `<th>${header}</th>`;
					});
					table += '</tr></thead><tbody>';

					for (const key in rows) {
						if (rows.hasOwnProperty(key)) {
							const row = rows[key];
							table += '<tr>';
							table += `<td>${row.id}</td>`;
							table += `<td>${row.fname}</td>`;
							table += `<td>${row.lname}</td>`;
							table += `<td>${row.email}</td>`;
							table += `<td>${new Date(row.date * 1000).toLocaleDateString()}</td>`;
							table += '</tr>';
						}
					}
					table += '</tbody></table>';

					dataTable.innerHTML = table;
				} else {
					dataTable.innerHTML = `<div class="error"><p>${response.data}</p></div>`;
				}
			})
			.catch(error => {
				console.error('Error:', error);
				dataTable.innerHTML = `<div class="error"><p>${error.message}</p></div>`;
			});
	});
});

