<?php

namespace Miusage;

if (defined('WP_CLI') && WP_CLI) {
    class WPCLICommand {
        public function __construct() {
            \WP_CLI::add_command('miusage refresh', array($this, 'refresh_data'));
        }

        public function refresh_data() {
            delete_transient('miusage_data_cache');
            \WP_CLI::success(__('Miusage data cache cleared.', 'miusage-plugin'));
        }
    }
}
