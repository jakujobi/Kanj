<?php
/**
 * The base configuration for WordPress
 *
 * The wp-config.php creation script uses this file during the installation.
 * You don't have to use the web site, you can copy this file to "wp-config.php"
 * and fill in the values.
 *
 * This file contains the following configurations:
 *
 * * Database settings
 * * Secret keys
 * * Database table prefix
 * * Localized language
 * * ABSPATH
 *
 * @link https://wordpress.org/support/article/editing-wp-config-php/
 *
 * @package WordPress
 */

// ** Database settings - You can get this info from your web host ** //
/** The name of the database for WordPress */
define( 'DB_NAME', 'local' );

/** Database username */
define( 'DB_USER', 'root' );

/** Database password */
define( 'DB_PASSWORD', 'root' );

/** Database hostname */
define( 'DB_HOST', 'localhost' );

/** Database charset to use in creating database tables. */
define( 'DB_CHARSET', 'utf8' );

/** The database collate type. Don't change this if in doubt. */
define( 'DB_COLLATE', '' );

/**#@+
 * Authentication unique keys and salts.
 *
 * Change these to different unique phrases! You can generate these using
 * the {@link https://api.wordpress.org/secret-key/1.1/salt/ WordPress.org secret-key service}.
 *
 * You can change these at any point in time to invalidate all existing cookies.
 * This will force all users to have to log in again.
 *
 * @since 2.6.0
 */
define( 'AUTH_KEY',          '|}^Q]{3nF{9p(0z0fI*<Xk!P0RM.?Y8E$+ot*Yd>w8qfbG[``|Iru$_ZkXq$086V' );
define( 'SECURE_AUTH_KEY',   ',oK1ggDqID8Xo)Li4xDn}KFt/xt%QOt}XVF/0IcC9UmW0RhS[z^srEkuLT2Sm$d%' );
define( 'LOGGED_IN_KEY',     'tA/VQJ7lJ?A?^?Rk=&U,DmtA|e64FJ Aq27Pex(gw+wkfhk4x;eB4xqm(9C4~9FY' );
define( 'NONCE_KEY',         'ckn%~cb`5K^NjewBjQYy*uOpY|DyQ*5sL2XQ9]AwV,HfF^%Q6]UvH8D;S{v/)6+E' );
define( 'AUTH_SALT',         'ysOc&w2U.`*+Hmn86CKC`lwuQM}uqHOk#&X/PoJj~9v$os}m9~AoJK/05eB,v:lw' );
define( 'SECURE_AUTH_SALT',  'q)!p@?JL HtMLD-=gf=8bs6=Yl-Ihro^_w;79rXk4BP{2x}K#_BlE`kiF&}zls5|' );
define( 'LOGGED_IN_SALT',    'hx}Pt#BTF@q[LS!w8X}6(f/s4dz/rvf+)82PzalYdGZ69w-dJeH.n_>yHiXLfepA' );
define( 'NONCE_SALT',        '.)B^$rWjd$9Q0)~tU?o9z@7b@z>8yBNWVL50u]|l^t[)NnS/S5x!o*h(7MF_D%O%' );
define( 'WP_CACHE_KEY_SALT', 'V<NkJ~-g<}t0ORYAhjf!R*Z=(,E0Hq!moJSOV`xt_ZQ5Qy]6`A.hHwKc^690.sPH' );


/**#@-*/

/**
 * WordPress database table prefix.
 *
 * You can have multiple installations in one database if you give each
 * a unique prefix. Only numbers, letters, and underscores please!
 */
$table_prefix = 'wp_';


/* Add any custom values between this line and the "stop editing" line. */



/**
 * For developers: WordPress debugging mode.
 *
 * Change this to true to enable the display of notices during development.
 * It is strongly recommended that plugin and theme developers use WP_DEBUG
 * in their development environments.
 *
 * For information on other constants that can be used for debugging,
 * visit the documentation.
 *
 * @link https://wordpress.org/support/article/debugging-in-wordpress/
 */
if ( ! defined( 'WP_DEBUG' ) ) {
	define( 'WP_DEBUG', false );
}

define( 'WP_ENVIRONMENT_TYPE', 'local' );
/* That's all, stop editing! Happy publishing. */

/** Absolute path to the WordPress directory. */
if ( ! defined( 'ABSPATH' ) ) {
	define( 'ABSPATH', __DIR__ . '/' );
}

/** Sets up WordPress vars and included files. */
require_once ABSPATH . 'wp-settings.php';
