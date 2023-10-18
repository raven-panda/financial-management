<?php
    $request_method = $_SERVER['REQUEST_METHOD'];
    $mysql_connection = databaseConnection();

    if ($mysql_connection) {
        if ($request_method === 'GET') {

            $sql = "SELECT `id`, `name`, `amount` FROM `estates`";
            $sth = $mysql_connection->query($sql);
    
            $GLOBALS['response'] = $sth->fetchAll(PDO::FETCH_ASSOC);

        } else if ($request_method === 'POST') {

            $jsondata = file_get_contents('php://input');
            $decoded = sanitizeObject(json_decode($jsondata, true));

            if ($decoded && isset($decoded['name']) && isset($decoded['amount']) && !empty($decoded['name']) && !empty($decoded['amount']) && isset($decoded['date']) && !empty($decoded['date'])) {
                
                $name = htmlspecialchars($decoded['name']);
                $amount = htmlspecialchars($decoded['amount']);
    
                try {

                    $sql = "INSERT INTO `estates` (`name`, `amount`) VALUES (:name, :amount)";
                    $sth = $mysql_connection->prepare($sql);
                    $sth->bindParam(':name', $name, PDO::PARAM_STR);
                    $sth->bindParam(':amount', $amount, PDO::PARAM_STR);
    
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

            $est_id = $ids[0];
            try {
                $sql = "DELETE FROM `estates` WHERE `id` = :estid";
                $sth = $mysql_connection->prepare($sql);
                
                $sth->bindParam(':estid', $est_id, PDO::PARAM_STR);
                
                $sth->execute();

                if ($sth->rowCount() > 0) {
                    $GLOBALS['response'] = $RES->validMessage(3);
                } else {
                    $GLOBALS['response'] = $RES->errorMessage(201);
                }

            } catch (PDOException $err) {
                $GLOBALS['response'] = $err->getMessage();
            }

        } else {
            $GLOBALS['response'] = $RES->errorMessage(100);
        }
    } else {
        $GLOBALS['response'] = $RES->errorMessage(203);
    }
?>