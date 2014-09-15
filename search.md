---
title: Search
---

<script type="text/javascript" src="/js/jquery.ba-hashchange.min.js"></script>
<script type="text/javascript" src="/js/jquery.swiftype.search.js"></script>

<div id="search-results"></div>

<script type="text/javascript">
  (function() {
    function getParameterByName(name) {
      name = name.replace(/[\[]/, "\\[").replace(/[\]]/, "\\]");
      var regex = new RegExp("[\\?&]" + name + "=([^&#]*)");
      var results = regex.exec(location.search);

      return results == null ? "" : decodeURIComponent(results[1].replace(/\+/g, " "));
    }

    var query = getParameterByName('q');

    $('#search-input').val(query);

    $('#search-input').swiftypeSearch({
      resultContainingElement: '#search-results',
      engineKey: 'gsLKKoQYUiLHFk6x8EXU'
    });

    $('#search-input').submit();

    $('#search-input').on('input', function() {
      $('#search-input').submit();
    });
  })()
</script>
