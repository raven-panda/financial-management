<?php
    /**
     * This is my validation and errors/warnings response messages manager.
     */
    class MessageResponses {
        /**
         * The error manager function
         * @param int Message code
         */
        function errorMessage($code) {
            switch ($code) {
                // Form invalidity errors/warnings
                case 100:
                    return array('100' => 'Syntax Error: Fields are missing or incorrect.');
                case 101:
                    return array('101' => 'Syntax Error: Special characters aren\'t allowed.');

                // PDO MySQL errors/warnings
                case 200:
                    return array("200" => 'Server Error: There was a problem during your request, please try again.');
                case 201:
                    return array("201" => 'Server Warning: No changes.');
                case 202:
                    return array("202" => 'Server Error: Already exists.');
                case 210:
                    return array("210" => 'Server Error: Not found.');
                        
                // API request errors/warnings
                case 400:
                    return array("400" => "Request Error: Path or method used may be incorrect.");
                default:
                    return null;
            }
        }
        /**
         * The validation messages manager function
         * @param int Message code
         */
        function validMessage($code) {
            switch ($code) {
                case 1:
                    return array("1" => 'Server: Added Successfully.');
                case 2:
                    return array("2" => 'Server: Edited Successfully.');
                case 3:
                    return array("3" => 'Server: Deleted Successfully.');
                default:
                    return null;
            }
        }
    }
    /**
     * Function for connection to the MySQL Database
     * @return object The PDO connection to the database
     */
    function databaseConnection() {
        
        try {    
            $dsn = 'mysql:host='. getenv('MYSQL_HOST') .';dbname='. getenv('MYSQL_DATABASE') .';charset=utf8';
            $mysql_connection = new PDO($dsn, getenv('MYSQL_USER'), getenv('MYSQL_PASSWORD'));
        } catch (Exception $err) {
            error_log($err->getMessage());
            $mysql_connection = false;
        }

        return $mysql_connection;
    }

    /**
     * Function for JSON objects sanitizing
     * @param array The input JSON decoded array
     * @return array The output PHP array
     */
    function sanitizeObject($object) {
        // Checking if the given parameter is an array
        if (is_array($object)) {

            // Sanitizing the array values
            foreach($object as $key => $value) {
                // Checking if the value is an array to sanitize
                if (is_array($value)) {
                    $value_sanitized = sanitizeObject($value);
                } else {
                    $value_sanitized = htmlspecialchars($value, ENT_QUOTES, 'UTF-8');
                }

                // Defining the output array values with their original keys
                $object_sanitized[$key] = $value_sanitized;
            }

            return $object_sanitized;
        } else {
            return false;
        }
    }
?>