const { registerBlockType } = wp.blocks;
const { createElement: el, useState } = wp.element;
const { InspectorControls, useBlockProps } = wp.blockEditor;
const { PanelBody, ToggleControl } = wp.components;

registerBlockType('miusage/data-block', {
	title: 'Miusage Data Block',
	icon: 'chart-area',
	category: 'widgets',
	edit: (props) => {
		const blockProps = useBlockProps();
		const [data, setData] = useState(null);
		const [isLoading, setIsLoading] = useState(false);
		const [columnsVisibility, setColumnsVisibility] = useState({
			id: true,
			fname: true,
			lname: true,
			email: true,
			date: true
		});

		const loadData = () => {
			setIsLoading(true);
			fetch(ajaxurl + '?action=miusage_get_data')
				.then(response => response.json())
				.then(response => {
					if (response.success) {
						setData(response.data.data);
					} else {
						console.error('Failed to fetch data', response.data);
					}
					setIsLoading(false);
				})
				.catch(error => {
					console.error('Error:', error);
					setIsLoading(false);
				});
		};

		const toggleColumnVisibility = (column) => {
			setColumnsVisibility({
				...columnsVisibility,
				[column]: !columnsVisibility[column]
			});
		};

		return el(
			'div',
			blockProps,
			el(
				InspectorControls,
				{},
				el(
					PanelBody,
					{ title: 'Column Visibility', initialOpen: true },
					el(ToggleControl, {
						label: 'ID',
						checked: columnsVisibility.id,
						onChange: () => toggleColumnVisibility('id')
					}),
					el(ToggleControl, {
						label: 'First Name',
						checked: columnsVisibility.fname,
						onChange: () => toggleColumnVisibility('fname')
					}),
					el(ToggleControl, {
						label: 'Last Name',
						checked: columnsVisibility.lname,
						onChange: () => toggleColumnVisibility('lname')
					}),
					el(ToggleControl, {
						label: 'Email',
						checked: columnsVisibility.email,
						onChange: () => toggleColumnVisibility('email')
					}),
					el(ToggleControl, {
						label: 'Date',
						checked: columnsVisibility.date,
						onChange: () => toggleColumnVisibility('date')
					})
				)
			),
			el(
				'button',
				{
					onClick: loadData,
					disabled: isLoading,
					className: 'button button-primary'
				},
				isLoading ? 'Loading...' : 'Load Data'
			),
			data &&
			el(
				'table',
				{ className: 'widefat fixed', cellspacing: '0' },
				el(
					'thead',
					{},
					el(
						'tr',
						{},
						columnsVisibility.id && el('th', {}, 'ID'),
						columnsVisibility.fname && el('th', {}, 'First Name'),
						columnsVisibility.lname && el('th', {}, 'Last Name'),
						columnsVisibility.email && el('th', {}, 'Email'),
						columnsVisibility.date && el('th', {}, 'Date')
					)
				),
				el(
					'tbody',
					{},
					Object.values(data.rows).map(row =>
						el(
							'tr',
							{ key: row.id },
							columnsVisibility.id && el('td', {}, row.id),
							columnsVisibility.fname && el('td', {}, row.fname),
							columnsVisibility.lname && el('td', {}, row.lname),
							columnsVisibility.email && el('td', {}, row.email),
							columnsVisibility.date && el('td', {}, new Date(row.date * 1000).toLocaleDateString())
						)
					)
				)
			)
		);
	},
	save: () => {
		return null;
	}
});
