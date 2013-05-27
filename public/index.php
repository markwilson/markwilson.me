<?php

// include the constants - i.e. define(GOOGLE_ANALYTICS_CODE, ...);
require_once '../constants.php';

?>
<!DOCTYPE html>
<html>
    <head>
        <!--[if IE]><script src="//html5shiv.googlecode.com/svn/trunk/html5.js"></script><![endif]-->
        <title>Mark Wilson - Web developer</title>
        <link rel="stylesheet" type="text/css" href="/static/bootstrap/css/bootstrap.min.css" />
        <link rel="stylesheet" type="text/css" href="/static/css/main.css" />
        <script type="text/javascript" src="//ajax.googleapis.com/ajax/libs/jquery/2.0.0/jquery.min.js"></script>
        <script type="text/javascript" src="/static/bootstrap/js/bootstrap.min.js"></script>
        <script type="text/javascript" src="/static/js/contact.js"></script>

        <meta name="keywords" content="web developer, PHP, open source, freelance" />
        <meta name="description" content="Mark Wilson - Web developer. Will code for you" />
    </head>
    <body>
        <div class="container">
            <div class="hero-unit clearfix">
                <h1>Mark Wilson <small>Web developer</small></h1>
                <div id="codefor" class="clearfix">
                    <p class="pull-left">Will code for&nbsp;</p>
                    <ul class="unstyled pull-left cyclic-list">
                        <li>food.</li>
                        <li><del class="muted">inflatables</del></li>
                        <li><del class="muted">fish</del></li>
                        <li>knowledge.</li>
                        <li><del class="muted">Superman</del></li>
                        <li><del class="muted">underwear</del></li>
                        <li>fun.</li>
                        <li><del class="muted">acceptance</del></li>
                        <li><del class="muted">no one</del></li>
                        <li>you.</li>
                    </ul>
                </div>
                <p class="pull-right">
                    <button data-target="#contact" class="btn btn-primary btn-large" role="button" data-toggle="modal">
                        Get in touch
                    </button>
                </p>
            </div>

            <div class="pull-right">
                <ul class="inline">
                    <li>
                        <a href="https://twitter.com/mark_wilson">Twitter: <small>@mark_wilson</small></a>
                    </li>
                    <li>
                        <a href="https://github.com/markwilson">GitHub: <small>markwilson</small></a>
                    </li>
                </ul>
            </div>
        </div>

        <div id="contact" class="modal hide fade" tabindex="-1" role="dialog" aria-labelledby="contactLabel" aria-hidden="true">
            <div class="modal-header">
                <h3 id="contactLabel">Get in touch</h3>
            </div>
            <div class="modal-body">
                <form class="form-horizontal">
                    <div class="control-group">
                        <label class="control-label" for="inputName">Name</label>
                        <div class="controls">
                            <input type="text" name="name" id="inputName" placeholder="Name" />
                        </div>
                    </div>
                    <div class="control-group">
                        <label class="control-label" for="inputEmail">Email</label>
                        <div class="controls">
                            <input type="text" name="email" id="inputEmail" placeholder="Email" />
                        </div>
                    </div>
                    <div class="control-group">
                        <label class="control-label" for="inputMessage">Message</label>
                        <div class="controls">
                            <textarea name="message" id="inputMessage" rows="3"></textarea>
                        </div>
                    </div>
                    <div class="control-group">
                        <div class="controls">
                            <button type="submit" class="btn btn-primary">Send</button>
                        </div>
                    </div>
                </form>
            </div>
            <div class="modal-footer">
                <button class="btn" data-dismiss="modal" aria-hidden="true">Cancel</button>
            </div>
        </div>

<?php if (APPLICATION_ENV === 'production'): ?>
        <script type="text/javascript">

            var _gaq = _gaq || [];
            _gaq.push(['_setAccount', '<?php echo GOOGLE_ANALYTICS_CODE; ?>']);
            _gaq.push(['_trackPageview']);

            (function() {
                var ga = document.createElement('script'); ga.type = 'text/javascript'; ga.async = true;
                ga.src = ('https:' == document.location.protocol ? 'https://ssl' : 'http://www') + '.google-analytics.com/ga.js';
                var s = document.getElementsByTagName('script')[0]; s.parentNode.insertBefore(ga, s);
            })();

        </script>
<?php endif; ?>
    </body>
</html>