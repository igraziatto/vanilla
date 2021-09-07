<?php
/**
 * @author Todd Burry <todd@vanillaforums.com>
 * @copyright 2009-2021 Vanilla Forums Inc.
 * @license GPL-2.0-only
 */

namespace Vanilla\Utility;

/**
 * Some utilities to help with debugging and/or support.
 */
class DebugUtils {
    const WRAP_HTML_COMMENT = 'html-comment';
    const WRAP_HTML = 'html';
    const WRAP_HTML_NONE = 'html-none';

    /**
     * Test whether or not we are in debug mode.
     *
     * This is a cleaner way of calling our legacy `debug()` function for now.
     *
     * @return bool
     */
    public static function isDebug(): bool {
        return (bool)debug();
    }

    /**
     * Set debug mode.
     *
     * @param bool $debug The new debug mode.
     * @return bool Returns the last value of debug.
     */
    public static function setDebug(bool $debug): bool {
        $r = self::isDebug();
        debug($debug);
        return $r;
    }

    /**
     * Return a string from an exception with different output depending on debug mode.
     *
     * @param \Throwable $ex The exception to render.
     * @param string $message An optional message to add above the exception.
     * @param string $wrap How to wrap the output.
     * @return string
     */
    public static function renderException(\Throwable $ex, string $message = '', string $wrap = self::WRAP_HTML): string {
        $r = [];

        if (!empty($message)) {
            $r[] = $message;
        }
        $r[] = $ex->getMessage();

        if (self::isDebug()) {
            $r[] = $ex->getTraceAsString();
        }
        $wrapped = self::wrapMessage(implode("\n\n", $r), $wrap);
        return $wrapped;
    }

    /**
     * Render a message to a string and output it wrapped properly.
     *
     * @param string $message The message to render. This message should NOT be escaped.
     * @param string $wrap One of the __WRAP_*__ constants.
     * @return string Returns the message properly wrapped and escaped.
     */
    public static function wrapMessage(string $message, string $wrap = self::WRAP_HTML): string {
        switch ($wrap) {
            case self::WRAP_HTML_NONE:
                return htmlspecialchars($message);
            case self::WRAP_HTML_COMMENT:
                return self::wrapHtmlComment($message);
            case self::WRAP_HTML:
            default:
                return self::wrapDebug($message);
        }
    }

    /**
     * Wrap a string in an HTML comment while escaping the text.
     *
     * @param string $message The message to wrap.
     * @return string Returns an HTML comment.
     */
    public static function wrapHtmlComment(string $message): string {
        $message = str_replace(['<!--', '-->'], ['<!~~', '~~>'], $message);
        return "\n<!--\n$message\n-->\n";
    }

    /**
     * Wrap a string in a tag suitable for debug output.
     *
     * @param string $message The message to wrap.
     * @return string Returns an HTML element string.
     */
    public static function wrapDebug(string $message): string {
        return "\n".'<pre class="debug-dontUseCssOnMe">'.htmlspecialchars($message)."</pre>\n";
    }
}
