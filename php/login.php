<?php
    header('content-type:text/html;charset=utf-8;');
    $na=$_POST['na'];
    $pw=$_POST['pw'];
    $conn=mysqli_connect('127.0.0.1','root','root','lsh');
    $sql="INSERT INTO `user` (`username`,`password`) VALUES ('$na','$pw')";
    $res=mysqli_query($conn,$sql);
    mysqli_close();
?>