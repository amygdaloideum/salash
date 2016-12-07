import React, { Component, PropTypes } from 'react';
let RichTextEditor, RichTextEditorDefault;

import styles from './RecipeEditor.css';

export default class RecipeEditor extends Component {

  constructor () {
    super()
    this.state = {
      shouldRender: false,
      value: {}
    }
  }

  /*state = {
    value: RichTextEditor.createEmptyValue(),
    shouldRender: false
  }*/

  componentDidMount () {
    RichTextEditor = require('react-rte');
    RichTextEditorDefault = RichTextEditor.default;
    this.state.value = this.props.input.value ? RichTextEditor.createValueFromString(this.props.input.value, 'html') : RichTextEditor.createEmptyValue();    
    this.setState({shouldRender: true})
  }

  onChange = (value) => {
    this.setState({ value });
    if (this.props.input.onChange) {
      // Send the changes up to the parent component as an HTML string.
      // This is here to demonstrate using `.toString()` but in a real app it
      // would be better to avoid generating a string on each change.
      this.props.input.onChange(
        value.toString('html')
      );
    }
  };

  render() {
    const toolbarConfig = {
      // Optionally specify the groups to display (displayed in the order listed).
      display: ['INLINE_STYLE_BUTTONS', 'BLOCK_TYPE_BUTTONS', 'LINK_BUTTONS', 'BLOCK_TYPE_DROPDOWN', 'HISTORY_BUTTONS'],
      INLINE_STYLE_BUTTONS: [
        { label: 'Bold', style: 'BOLD', className: 'custom-css-class' },
        { label: 'Italic', style: 'ITALIC' },
        { label: 'Underline', style: 'UNDERLINE' }
      ],
      BLOCK_TYPE_DROPDOWN: [
        { label: 'Normal', style: 'unstyled' },
        { label: 'Heading Large', style: 'header-one' },
        { label: 'Heading Medium', style: 'header-two' },
        { label: 'Heading Small', style: 'header-three' }
      ],
      BLOCK_TYPE_BUTTONS: [
        { label: 'UL', style: 'unordered-list-item' },
        { label: 'OL', style: 'ordered-list-item' }
      ]
    };
    if (this.state.shouldRender) {
      return (
        <RichTextEditorDefault
          className={styles.editor}
          value={this.state.value}
          onChange={this.onChange}
          toolbarConfig={toolbarConfig}
          />
      );
    } else {
      return null;
    }
  }
}