<?php
    include './lib/functions.php';
    $RES = new MessageResponses();
    header("Access-Control-Allow-Origin: http://localhost:4200");
    header("Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS");
    header("Access-Control-Allow-Headers: Content-Type, Authorization");


    // Displays all available routes.
    function getAllroutes($RES) {
        $list_routes = array();
        foreach ($GLOBALS['routes'] as $key => $value) {
            $list_routes[] = $key;
        }
        $GLOBALS['response'] = $list_routes;
    }

    function financialsQuery($RES, $ids) {
        include './lib/financials.php';
    }

    function estatesQuery($RES, $ids) {
        include './lib/estates.php';
    }

    // Checks if the requested route exists, and then execute the function associated.
    function router($url, $method, $RES) {
        foreach($GLOBALS['routes'] as $pattern => $handler) {
            $fullUrl = $method . ':' . $url;
            $pattern = str_replace('{id}', '([^/]+)', $pattern);
            $pattern = str_replace('/', '\/', $pattern);
            if(preg_match('/^' . $pattern . '$/', $fullUrl, $matches)) {
                array_shift($matches);
                call_user_func($handler, $RES, $matches);
                return;
                
            }
            $GLOBALS['response'] = $RES->errorMessage(400);
        }
    }

    // Routes and functions trigger defining
    $GLOBALS['routes'] = [
        'GET:/api' => 'getAllroutes',
        
        'GET:/api/financials' => 'financialsQuery',
        'POST:/api/financials' => 'financialsQuery',
        'DELETE:/api/financials/{id}' => 'financialsQuery',

        'GET:/api/estates' => 'estatesQuery',
        'POST:/api/estates' => 'estatesQuery',
        'DELETE:/api/estates/{id}' => 'estatesQuery'

    ];
    $GLOBALS['response'] = "";

    // Router execution
    $request_url = $_SERVER['REQUEST_URI'];
    $method = $_SERVER['REQUEST_METHOD'];

    if (str_starts_with($request_url, '/api')) {
        router($request_url, $method, $RES);
        echo json_encode($GLOBALS['response'], JSON_UNESCAPED_SLASHES);
    } else {
        http_response_code(404);
    }
?>