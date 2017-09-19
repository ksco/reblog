function Renderer (options) {
  this.options = options || {};
  this.whitespaceDelimiter = this.options.spaces ? ' ' : '\n';
  this.showImageText = (typeof this.options !== 'undefined') ? this.options.showImageText : true;
}

Renderer.prototype.code = function(code, lang, escaped) {
  return this.whitespaceDelimiter + this.whitespaceDelimiter + code + this.whitespaceDelimiter + this.whitespaceDelimiter;
}
Renderer.prototype.blockquote = function(quote) {
  return '\t' + quote + this.whitespaceDelimiter;
}
Renderer.prototype.html = function(html) {
  return html;
}
Renderer.prototype.heading = function(text, level, raw) {
  return text;
}
Renderer.prototype.hr = function() {
  return this.whitespaceDelimiter + this.whitespaceDelimiter;
}
Renderer.prototype.list = function(body, ordered) {
  return body;
}
Renderer.prototype.listitem = function(text) {
  return '\t' + text + this.whitespaceDelimiter;
}
Renderer.prototype.paragraph = function(text) {
  return this.whitespaceDelimiter + text + this.whitespaceDelimiter;
}
Renderer.prototype.table = function(header, body) {
  return  this.whitespaceDelimiter + header + this.whitespaceDelimiter + body + this.whitespaceDelimiter;
}
Renderer.prototype.tablerow = function(content) {
  return content + this.whitespaceDelimiter;
}
Renderer.prototype.tablecell = function(content, flags) {
  return content + '\t';
}
Renderer.prototype.strong = function(text) {
  return text;
}
Renderer.prototype.em = function(text) {
  return text;
}
Renderer.prototype.codespan = function(text) {
  return text;
}
Renderer.prototype.br = function() {
  return this.whitespaceDelimiter + this.whitespaceDelimiter;
}
Renderer.prototype.del = function(text) {
  return text;
}
Renderer.prototype.link = function(href, title, text) {
  return text;
}
Renderer.prototype.image = function(href, title, text) {
  return this.showImageText ? text : '';
}
Renderer.prototype.text = function(text) {
  return text;
}

export default Renderer;