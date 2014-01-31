Changelog
=========

Version 0.6.3

- changelog added
- new commandline parameter handling (abee uses optimist to parse arguments now) 
- exported module functions declared outside module.exports
- support for coffeescript added (thanks to [rantav](https://github.com/rantav) for the coffescript templates)
- 'abeetize' now can delete standard meteor files and insecure modules (pass -d at commandline)
- 'create' and 'abeetize' now supports -p for (design-)pattern and -l for language (defaults are -p mvc -l js)
- directory structure changed to support multi-(scripting-)language support
- Template search order changed. The order is now:
  - templates/&lt;pattern&gt;/&lt;language&gt;/
  - templates/&lt;pattern&gt;/
  - templates/&lt;language&gt;/
  - templates/


- 'create' now uses 'abeetize' internaly
- global is no longer used internaly