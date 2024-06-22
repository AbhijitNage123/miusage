<?php

namespace Miusage;

class AdminPage {
    public function __construct() {
        add_action('admin_menu', array($this, 'add_admin_menu'));
        add_action('admin_enqueue_scripts', array($this, 'enqueue_scripts'));
    }

    public function add_admin_menu() {
        add_menu_page(
            __('Miusage Data', 'miusage-plugin'),
            __('Miusage Data', 'miusage-plugin'),
            'manage_options',
            'miusage-data',
            array($this, 'admin_page_content'),
            'dashicons-chart-area'
        );
    }

    public function admin_page_content() {
        ?>
        <div class="wrap">
            <h1><?php _e('Miusage Data', 'miusage-plugin'); ?></h1>
            <button id="refresh-data"><?php _e('Refresh Data', 'miusage-plugin'); ?></button>
            <div id="data-table">
                <!-- Data will be populated here -->
            </div>
        </div>
        <?php
    }

    public function enqueue_scripts($hook) {
        if ($hook !== 'toplevel_page_miusage-data') {
            return;
        }
        wp_enqueue_script('miusage-admin-js', MIUSAGE_PLUGIN_URL . 'assets/js/admin.js', array(), filemtime(MIUSAGE_PLUGIN_DIR . 'assets/js/admin.js'), true);
        wp_localize_script('miusage-admin-js', 'ajaxurl', admin_url('admin-ajax.php'));
    }
}
