jest.dontMock('../ImageUpload.react.js');

describe("React ImageUpload Component", function() {
 
  it("should have an file input", function() {
    var React = require('react/addons');
    var ImageUpload = require('../ImageUpload.react');
    var TestUtils = React.addons.TestUtils;

    var component = TestUtils.renderIntoDocument(
      <ImageUpload/>
    );

    var imageInput = TestUtils.findRenderedDOMComponentWithClass(component, 'rfu-image-input');

    console.log(imageInput.getDOMNode().value)

    expect(TestUtils.isDOMComponent(imageInput)).toBeTruthy();
    expect(imageInput.getDOMNode().getAttribute('type')).toEqual('file');
  });

});