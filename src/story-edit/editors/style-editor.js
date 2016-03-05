/**
 Manages the stylesheet editor modal of a StoryEditView.

 @class StoryEditView.StyleEditor
 @extends Backbone.View
**/

'use strict';
const Backbone = require('backbone');
const CodeMirror = require('codemirror');

require('codemirror/mode/css/css');
require('codemirror/addon/display/placeholder');
require('codemirror/addon/hint/show-hint');

module.exports = Backbone.View.extend({
	initialize(options) {
		this.parent = options.parent;

		// we have to use the [0] index here because CodeMirror
		// expects a DOM element, not a jQuery object

		this.styleEditor = CodeMirror.fromTextArea(
			this.$('.stylesheetSource')[0],
			{
				lineWrapping: true,
				lineNumbers: false,
				tabSize: 2,
				indentWithTabs: true,
				mode: 'css',
				extraKeys: {
					'Ctrl-Space'(cm) {
						cm.showHint();
					}
				}
			}
		);
		this.$('.stylesheetSource:first').data('codemirror', this.styleEditor);

		this.$el.on({
			'modalshown': () => {
				this.$el.one('animationend', function() {
					this.styleEditor.refresh();
					this.styleEditor.focus();
				}.bind(this));
			},
			'modalhide': () => {
				this.save();
			}
		});
	},

	/**
	 Opens a modal dialog for editing the story's stylesheet.

	 @method open
	**/

	open() {
		this.styleEditor.doc.setValue(this.parent.model.get('stylesheet'));
		this.styleEditor.refresh();
		this.$el.data('modal').trigger('show');
	},

	/**
	 Closes the modal dialog.

	 @method close
	**/

	close() {
		this.$el.data('modal').trigger('hide');
	},

	/**
	 Saves changes to the model.

	 @method save
	**/

	save() {
		this.parent.model.save({
			stylesheet: this.styleEditor.doc.getValue()
		});
	}
});
