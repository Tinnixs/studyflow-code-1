<?php
class Database {
    private static ?PDO $instancia = null;

    public static function getConnection(): PDO {
        if (self::$instancia === null) {
            $config = parse_ini_file('config.ini');
            self::$instancia = new PDO($config['driver'] . ':' . $config['path']);
            self::$instancia->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
        }
        return self::$instancia;
    }
}