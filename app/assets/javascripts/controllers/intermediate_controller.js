(function() {
  var IntermediateController = function(parentElement) {
    this.parentElement = parentElement;
  };

  IntermediateController.prototype.showOptions = function(quest_control) {
    var $el = $(this.parentElement);
    var _controller = this;
    var quest_controller = quest_control
    var intermediateView = new Views.Intermediate($el,_controller,quest_controller);
  };

  window.Controllers = window.Controllers || {};
  window.Controllers.Intermediate = IntermediateController;
})()
