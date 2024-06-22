<?php

namespace Miusage;

class GutenbergBlock {
    public function __construct() {
        add_action('init', array($this, 'register_block'));
    }

    public function register_block() {
        wp_register_script(
            'miusage-block',
            MIUSAGE_PLUGIN_URL . 'assets/js/block.js',
            array('wp-blocks', 'wp-element', 'wp-editor', 'wp-components', 'wp-api-fetch'),
            filemtime(MIUSAGE_PLUGIN_DIR . 'assets/js/block.js')
        );

        register_block_type('miusage/data-block', array(
            'editor_script' => 'miusage-block',
        ));
    }
}
