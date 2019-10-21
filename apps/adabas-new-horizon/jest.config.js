module.exports = {
  name: 'adabas-new-horizon',
  preset: '../../jest.config.js',
  coverageDirectory: '../../coverage/apps/adabas-new-horizon',
  snapshotSerializers: [
    'jest-preset-angular/AngularSnapshotSerializer.js',
    'jest-preset-angular/HTMLCommentSerializer.js'
  ]
};
