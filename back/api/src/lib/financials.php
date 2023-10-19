<?php
    $request_method = $_SERVER['REQUEST_METHOD'];
    $mysql_connection = databaseConnection();

    if ($mysql_connection) {
        if ($request_method === 'GET') {
            $sql = "SELECT `id`, `name`, `amount`, `date`, `description`, `status`, `roi`, `location`, `duration` FROM `financials`";
            $sth = $mysql_connection->query($sql);
    
            $GLOBALS['response'] = $sth->fetchAll(PDO::FETCH_ASSOC);
        } else if ($request_method === 'POST') {

            $jsondata = file_get_contents('php://input');
            $decoded = sanitizeObject(json_decode($jsondata, true));

            if (
                $decoded
                && isset($decoded['name']) && !empty($decoded['name'])
                && isset($decoded['amount'])
                && isset($decoded['date']) && !empty($decoded['date'])
                && isset($decoded['description']) && !empty($decoded['description'])
                && isset($decoded['status']) && !empty($decoded['status'])
                && isset($decoded['roi'])
                && isset($decoded['location']) && !empty($decoded['location'])
                && isset($decoded['duration'])
            ) {
                
                $name = htmlspecialchars($decoded['name']);
                $amount = filter_var($decoded['amount'], FILTER_SANITIZE_NUMBER_INT);
                $date = htmlspecialchars($decoded['date']);
                $description = htmlspecialchars($decoded['description']);
                $status = htmlspecialchars($decoded['status']);
                $roi = filter_var($decoded['roi'], FILTER_SANITIZE_NUMBER_INT);
                $location = htmlspecialchars($decoded['location']);
                $duration = filter_var($decoded['duration'], FILTER_SANITIZE_NUMBER_INT);

                $GLOBALS['response'] = $decoded;
                try {

                    $sql = "INSERT INTO `financials` (`name`, `amount`, `date`, `description`, `status`, `roi`, `location`, `duration`) VALUES (:name, :amount, :date, :description, :status, :roi, :location, :duration)";
                    $sth = $mysql_connection->prepare($sql);

                    $sth->bindParam(':name', $name, PDO::PARAM_STR);
                    $sth->bindParam(':amount', $amount, PDO::PARAM_INT);
                    $sth->bindParam(':date', $date, PDO::PARAM_STR);
                    $sth->bindParam(':description', $description, PDO::PARAM_STR);
                    $sth->bindParam(':status', $status, PDO::PARAM_STR);
                    $sth->bindParam(':roi', $roi, PDO::PARAM_INT);
                    $sth->bindParam(':location', $location, PDO::PARAM_STR);
                    $sth->bindParam(':duration', $duration, PDO::PARAM_INT);
    
                    $sth->execute();
    
                    $GLOBALS['response'] = $RES->validMessage(1);

                } catch (PDOException $err) {
                    if ($err->getCode() === "23000") {
                        $GLOBALS['response'] = $RES->errorMessage(202);
                    } else {
                        $GLOBALS['response'] = $RES->errorMessage(200);
                    }
                }
            } else {
                $GLOBALS['response'] = $RES->errorMessage(100);
            }
            
        } else if ($request_method === 'DELETE') {
        
            $fin_id = $ids[0];
    
            try {
    
                $sql = "DELETE FROM `financials` WHERE `id` = :finid";
                $sth = $mysql_connection->prepare($sql);
                
                $sth->bindParam(':finid', $fin_id, PDO::PARAM_STR);
                
                $sth->execute();
    
                if ($sth->rowCount() > 0) {
                    $GLOBALS['response'] = $RES->validMessage(3);
                } else {
                    $GLOBALS['response'] = $RES->errorMessage(201);
                }
    
            } catch (PDOException $err) {
                $GLOBALS['response'] = $err->getMessage();
            }
        }
    } else {
        $GLOBALS['response'] = $RES->errorMessage(203);
    }
?>