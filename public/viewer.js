"use strict";
var m4;
var gl;
var programInfo;

function make_int_array(s) {
  return s.split(',')
    .map( function(a){
      return parseInt(a, 10);
    });
}

function make_float_array(s) {
  return s.split(',')
    .map( function(a){
      return parseFloat(a);
    });
}

function start_render() {
  var position = $('#p').text();
  var normal = $('#n').text();
  var indices = $('#i').text();
  position = make_float_array(position);
  normal = make_float_array(normal);
  indices = make_int_array(indices);
  var arrays = {
    position: position,
    normal:   normal,
    //texcoord: texcoord,
    indices: indices
  };
  twgl.setAttributePrefix("a_");
  m4 = twgl.m4;
  gl = twgl.getWebGLContext($("#c") [0]);

  programInfo = twgl.createProgramInfo (gl, [ shadersHolder.vertex, shadersHolder.fragment ]);

  var bufferInfo = twgl.createBufferInfoFromArrays(gl, arrays);

  // A 2x2 pixel texture from a JavaScript array
  var texture = twgl.createTexture(gl, {
    min: gl.NEAREST,
    mag: gl.NEAREST,
    src: [
      255, 255, 255, 255,
      192, 192, 192, 255,
      192, 192, 192, 255,
      255, 255, 255, 255],
  });

  var uniforms = {
    u_lightWorldPos: [1, 8, -10],
    u_lightColor: [1, 0.8, 0.8, 1],
    u_ambient: [0, 0, 0, 1],
    u_specular: [1, 1, 1, 1],
    u_shininess: 50,
    u_specularFactor: 1,
    u_diffuse: texture,
  };

  function render(time) {
    time *= 0.001;
    twgl.resizeCanvasToDisplaySize(gl.canvas);
    gl.viewport(0, 0, gl.canvas.width, gl.canvas.height);
    gl.enable(gl.DEPTH_TEST);
    gl.enable(gl.CULL_FACE);
    gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);
    var projection = m4.perspective(
      30 * Math.PI / 180,
      gl.canvas.clientWidth / gl.canvas.clientHeight,
      0.5,
      10);
    var eye = [1, 4, -6];
    var target = [0, 0, 0];
    var up = [0, 1, 0];
    var camera = m4.lookAt(eye, target, up);
    var view = m4.inverse(camera);
    var viewProjection = m4.multiply(view, projection);
    var world = m4.rotationY(time);
    uniforms.u_viewInverse = camera;
    uniforms.u_world = world;
    uniforms.u_worldInverseTranspose = m4.transpose(m4.inverse(world));
    uniforms.u_worldViewProjection = m4.multiply(world, viewProjection);
    gl.useProgram(programInfo.program);
    twgl.setBuffersAndAttributes(gl, programInfo, bufferInfo);
    twgl.setUniforms(programInfo, uniforms);
    gl.drawElements(gl.TRIANGLES, bufferInfo.numElements, gl.UNSIGNED_SHORT, 0);
    requestAnimationFrame(render);
  }
  requestAnimationFrame(render);
}

var shadersLoaderCount =0 ;
var shadersHolder ={ vertex: '', fragment: '' } ;

function loadShader (shader, type) {
  console.log('loadShader: ' + type);
  var $shader =$(shader) ;
  $.ajax ({
    url: $shader [0].src,
    dataType: 'text',
    context: {
      name: $shader [0].id,
      type: type
    },
    complete: processShader
  }) ;
}

function processShader (jqXHR, textStatus) {
  console.log('processShader');
  shadersLoaderCount-- ;
  shadersHolder [this.context.type] =jqXHR.responseText ;

  if ( !shadersLoaderCount )
    shadersLoadComplete () ;
}

function shadersLoadComplete () {
  start_render () ;
}

$(document).ready (function () {
  console.log('document ready');
  var vertexShaders =$('script[type="x-shader/x-vertex"]') ;
  var fragmentShaders =$('script[type="x-shader/x-fragment"]') ;
  shadersLoaderCount =vertexShaders.length + fragmentShaders.length ;
  console.log('shadersLoaderCount: ' + shadersLoaderCount);

  loadShader (vertexShaders [0], 'vertex') ;
  loadShader (fragmentShaders [0], 'fragment') ;
}) ;
