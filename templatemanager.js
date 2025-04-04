
class TheHeader extends HTMLElement {
  connectedCallback() {
    this.innerHTML = '
        <nav class="navbar navbar-default navbar-static-top">
        <div class="container">
            <div class="navbar-header">
                <button type="button" class="navbar-toggle collapsed" data-toggle="collapse" data-target="#navbar" aria-expanded="false" aria-controls="navbar">
                    <span class="sr-only">Toggle navigation</span>
                    <span class="icon-bar"></span>
                    <span class="icon-bar"></span>
                    <span class="icon-bar"></span>
                </button>
                <a class="navbar-brand" href="index.html">CyberAlex</a>
            </div>
            <div id="navbar" class="navbar-collapse collapse">
                <ul class="nav navbar-nav navbar-right">
                    <li><a href="blog.html">> Blog</a></li>
                    <li><a href="projects.html">> Projects</a></li>
                    <li><a href="documents.html">> Documents</a></li>
                    <li><a href="contact.html">> Contact</a></li>
                    <li><a href="about.html">> About</a></li>
                </ul>
            </div>
        </div>
    </nav>
      '
  }
}


class TheFooter extends HTMLElement {
  connectedCallback() {
    this.innerHTML = '
      <footer class="footer">
          <div class="container">
              <div class="row">
                  <div class="col-md-4">
                      <h4>Legal</h4>
                      <ul class="list-unstyled">
                          <li>> <a href="privacypolicy.html">Privacy Policy</a></li>
                          <li>> <a href="termsandconditions.html">Terms and Conditions</a></li>
                          <li>> <a href="copyright.html">Copyright</a></li>
                          <li>> <a href="licences.html">Licences</a></li>
                      </ul>
                  </div>
                  <div class="col-md-4">
                      <h4>Quick Links</h4>
                      <ul class="list-unstyled">
                          <li>> <a href="index.html">Home</a></li>
                          <li>> <a href="blog.html">Blog</a></li>
                          <li>> <a href="projects.html">Projects</a></li>
                          <li>> <a href="contact.html">Contact</a></li>
                          <li>> <a href="about.html">About</a></li>
                      </ul>
                  </div>
                  <div class="col-md-4">
                      <h4>Page Information</h4>
                      <ul class="list-unstyled">
                          <li>Copyright &#169; <script>document.write(/\d{4}/.exec(Date())[0])</script> www.cyberalex.uk - All rights reserved.</li>
                      </ul>
                  </div>
              </div>
          </div>
      </footer>
      '
  }
}

customElements.define('the-header', TheHeader)
customElements.define('the-footer', TheFooter)
