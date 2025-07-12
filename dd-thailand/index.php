<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>PHP TEST</title>
</head>
<body>
    <a href="http://bmk-official.com" target="_blank">
    <?= "Hah! U should visit \"http://bmk-official.com\""; ?>
    </a>

    <?php
        $timePx = array(
            array( '0800', '226', '17' ),
            array( '0830', '242', '16' ),
            array( '0900', '257', '17' ),
            array( '0930', '273', '16' ),
            array( '1000', '288', '17' ),
            array( '1030', '304', '16' ),
            array( '1100', '319', '17' ),
            array( '1130', '335', '16' ),
            array( '1200', '350', '16' ),
            array( '1230', '365', '17' ),
            array( '1300', '381', '16' ),
            array( '1330', '396', '17' ),
            array( '1400', '412', '16' ),
            array( '1430', '427', '17' ),
            array( '1500', '443', '16' ),
            array( '1530', '458', '17' ),
            array( '1600', '474', '16' ),
            array( '1630', '489', '17' ),
            array( '1700', '505', '16' ),
            array( '1730', '520', '17' ),
            array( '1800', '536', '16' ),
            array( '1830', '551', '17' ),
            array( '1900', '567', '16' ),
            array( '1930', '582', '17' ),
            array( '2000', '598', '17' ),
            array( '2030', '614', '16' ),
            array( '2100', '629', '17' ),
            array( '2130', '645', '16' ),
            array( '2200', '660', '17' ),
            array( '2230', '676', '16' ),
            array( '2300', '691', '16' )
        );
    ?>

    <?php
    $row = array();
    $did                   =  "";
    $row['csv_item']       = "";
    $row['csv_startDate']  = "2024/05/05";
    $row['csv_startTime']  = "13:30";
    $row['csv_endDate']    = "2024/05/05";
    $row['csv_endTime']    ="15:30";

    $startTime = $row['csv_startTime'];
    $endTime = $row['csv_endTime'];
    ?>
    <div style="position:relative; background-color:#202020; width: 100%; height :120px">
        <div style="background: #80FFAA;
        display: block;
        position: absolute;
        height: 20px;
        top: 0;
        left: <?php
        
        // スタート位置　開始時間
        $stime = $startTime; // 13:30:00
        $pieces = explode(':', $stime );
        $shour   = $pieces[0] * 1;
        $smin    = $pieces[1] * 1;

        // 貸出不可, 8:00以前は後で
        if( $shour >= 8 )
        {
            if( $smin != 0 and $smin != 30 )
            {
                if( $smin < 30 )
                {
                    $amari = $smin;
                    $calc_min = 0;
                }
                else
                {
                    $amari = $smin - 30 ;
                    $calc_min = 30;
                }
            }
            else
            {
                $amari = 0;
                $calc_min = $smin;
            }

            $shm  = sprintf("%02d%02d", $shour, $calc_min ); // 0930
            $startPx = 0;
            $widthPx = '';

            foreach( $timePx as $val )
            {
                if( $shm == $val[0] )
                {
                    $startPx   = $val[1];
                    $widthPx   = $val[2];
                    break;
                }
            }
            //
            if( $amari != 0 )
            {
                $startPx += round( $amari / 30 * $widthPx );
            }
        }
        else
        {
            $startPx = 183;
        }

        $startPx = $startPx * 1;
        echo $startPx ."px;";
        ?>
        <?php
        // 終了時間
        $etime = $endTime;  // 9:30:00
        $pieces = explode(':', $etime ); // 9, 30, 0
        $ehour   = $pieces[0] * 1; // 9
        $emin    = $pieces[1] * 1; // 30

        
        if( $ehour > 22 ) // 貸出不可, 22:00以降
        {
            $lenPx   = 736 - $startPx;
        }
        else
        {
            if( $emin != 0 and $emin != 30 )
            {
                if( $emin < 30 )
                {
                    $amari = $emin;
                    $calc_min = 0;
                }
                else
                {
                    $amari = $emin - 30 ;
                    $calc_min = 30;
                }
            }
            else
            {
                $amari = 0;
                $calc_min = $emin;
            }

            $shm  = sprintf("%02d%02d", $ehour, $calc_min ); // 1530
            // $ehm  = sprintf("%02d%02d", $ehour, $calc_min ); // 1530
            $endPx = '';
            $widthPx = '';
            foreach( $timePx as $val )
            {
                if( $shm == $val[0] )
                // if( $ehm == $val[0] )
                {
                    $endPx   = $val[1]; // 273
                    $widthPx   = $val[2]; //16
                    break;
                }
            }
            //
            if( $amari != 0 )
            {
                $endPx += round( $amari / 30 * $widthPx );
            }
            $lenPx = $endPx - $startPx ;
        }
        

        $endPx = $endPx * 1;
        echo "width: ".($lenPx)."px;";
        // echo "width: ".($endPx-$startPx)."px;";
        ?>
        
        "><?= "StartPx: ".$startPx; ?> - <?= "Endpx: ".$endPx; ?>&nbsp;</div>
    </div>
</body>
</html>