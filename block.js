(function (blocks, element, editor, components, apiFetch) {
	var el = element.createElement;
	var registerBlockType = blocks.registerBlockType;
	var InspectorControls = editor.InspectorControls;
	var ToggleControl = components.ToggleControl;

	registerBlockType('miusage/data-block', {
		title: 'Miusage Data Block',
		icon: 'analytics',
		category: 'common',
		attributes: {
			showColumn1: { type: 'boolean', default: true },
			showColumn2: { type: 'boolean', default: true },
			// Add more columns as needed
		},
		edit: function (props) {
			var attributes = props.attributes;

			function toggleColumn(column) {
				return function (newValue) {
					var newAttributes = {};
					newAttributes[column] = newValue;
					props.setAttributes(newAttributes);
				};
			}

			return [
				el(InspectorControls, { key: 'controls' },
					el(ToggleControl, {
						label: 'Show Column 1',
						checked: attributes.showColumn1,
						onChange: toggleColumn('showColumn1')
					}),
					el(ToggleControl, {
						label: 'Show Column 2',
						checked: attributes.showColumn2,
						onChange: toggleColumn('showColumn2')
					})
					// Add more controls as needed
				),
				el('div', { key: 'content' },
					el('button', {
						onClick: function () {
							apiFetch({ path: '/wp-admin/admin-ajax.php?action=miusage_get_data' }).then(function (response) {
								// Handle the data response here
							});
						}
					}, 'Load Data'),
					// Display table with data here
				)
			];
		},
		save: function (props) {
			// Render content on the front-end
			return null;
		}
	});
})(
	window.wp.blocks,
	window.wp.element,
	window.wp.editor,
	window.wp.components,
	window.wp.apiFetch
);
