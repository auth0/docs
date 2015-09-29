<!-- Split button -->
<div class="btn-group">
  <button id="language-label" type="button" class="btn btn-info">Action</button>
  <button type="button" class="btn btn-info dropdown-toggle" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
    <span class="caret"></span>
    <span class="sr-only">Toggle Dropdown</span>
  </button>
  <ul class="dropdown-menu">
    <li><a id="language-objc">Objective-C</a></li>
    <li><a id="language-swift">Swift</a></li>
  </ul>
</div>
<script>
  var text;
  if (document.location.pathname.indexOf('-objc') > 0) {
    text = 'Language: Objective-C'
  } else {
    text = 'Language: Swift'
  }
  $('#language-label').text(text);
  $('#language-objc').attr('href', document.location.pathname.replace('-swift', '-objc'));
  $('#language-swift').attr('href', document.location.pathname.replace('-objc', '-swift'));
</script>
