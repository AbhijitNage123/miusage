// jQuery(document).ready(function ($) {
// 	$('#refresh-data').click(function () {
// 		$.ajax({
// 			url: ajaxurl,
// 			type: 'GET',
// 			data: {
// 				action: 'miusage_get_data'
// 			},
// 			success: function (response) {
// 				if (response.success) {
// 					let tableHtml = '<table>';
// 					response.data.forEach(item => {
// 						tableHtml += `<tr><td>${item.column1}</td><td>${item.column2}</td></tr>`;
// 					});
// 					tableHtml += '</table>';
// 					$('#data-table').html(tableHtml);
// 				}
// 			}
// 		});
// 	});
// });

document.addEventListener('DOMContentLoaded', function () {
	const refreshButton = document.getElementById('refresh-data');
	const dataTable = document.getElementById('data-table');

	refreshButton.addEventListener('click', function () {
		fetch(ajaxurl + '?action=miusage_get_data')
			.then(response => response.json())
			.then(data => {
				console.log(data);
				if (data.success) {
					let tableHtml = '<table>';
					data.data.forEach(item => {
						tableHtml += `<tr><td>${item.column1}</td><td>${item.column2}</td></tr>`;
					});
					tableHtml += '</table>';
					dataTable.innerHTML = tableHtml;
				}
			})
			.catch(error => {
				console.error('Error fetching data:', error);
			});
	});
});
