<?php

namespace Miusage;

class Ajax {
    public function __construct() {
        add_action('wp_ajax_miusage_get_data', array($this, 'get_data'));
        add_action('wp_ajax_nopriv_miusage_get_data', array($this, 'get_data'));
    }

    public function get_data() {
        $cache_key = 'miusage_data_cache';
        $data = get_transient($cache_key);

        if (false === $data) {
            $response = wp_remote_get('https://miusage.com/v1/challenge/1/');
            if (is_wp_error($response)) {
                wp_send_json_error(__('Failed to fetch data', 'miusage-plugin'));
            }
            $data = wp_remote_retrieve_body($response);
            set_transient($cache_key, $data, HOUR_IN_SECONDS);
        }

        wp_send_json_success(json_decode($data, true));
    }
}
