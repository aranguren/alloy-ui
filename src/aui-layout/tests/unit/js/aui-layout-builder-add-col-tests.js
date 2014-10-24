YUI.add('aui-layout-builder-add-col-tests', function(Y) {

    var suite = new Y.Test.Suite('aui-layout-builder-add-col');

    suite.add(new Y.Test.Case({
        name: 'Layout Builder Add Col Tests',

        tearDown: function() {
            if (this._layoutBuilder) {
                this._layoutBuilder.destroy();
            }
        },

        _createLayoutBuilder: function(config) {
            var layout = new Y.Layout({
                rows: [
                    new Y.LayoutRow({
                        cols: [
                            new Y.LayoutCol({
                                size: 6,
                                value: { content: '6' }
                            }),
                            new Y.LayoutCol({
                                size: 6,
                                value: { content: '6' }
                            })
                        ]
                    }),
                    new Y.LayoutRow({
                        cols: [
                            new Y.LayoutCol({
                                size: 3,
                                value: { content: '3' }
                            }),
                            new Y.LayoutCol({
                                size: 3,
                                value: { content: '3' }
                            }),
                            new Y.LayoutCol({
                                size: 3,
                                value: { content: '3' }
                            }),
                            new Y.LayoutCol({
                                size: 3,
                                value: { content: '3' }
                            })
                        ]
                    })
                ]
            });
            this._layoutBuilder = new Y.LayoutBuilder(Y.merge({
                container: Y.one('.container'),
                layout: layout
            }, config));
        },

        'should add a col to a row when click on add col button': function() {
            var addColButton,
                col,
                layout;

            this._createLayoutBuilder();

            col = Y.one('.col-sm-6');
            addColButton = col.ancestor().one('.layout-builder-add-col');
            addColButton.simulate('click');

            layout = this._layoutBuilder.get('layout');
            Y.Assert.areEqual(layout.get('rows')[0].get('cols').length, 3);
        },

        'should add a col at the beginning of a row when click on the left button': function() {
            var addColButton,
                container,
                firstCol,
                row;

            this._createLayoutBuilder();

            container = this._layoutBuilder.get('container');
            row = container.one('.row');

            firstCol = row.one('.col');

            Y.Assert.isNotNull(firstCol.getData('layout-col').get('value'));

            addColButton = row.one('.layout-builder-add-col-left');
            addColButton.simulate('click');

            firstCol = row.one('.col');

            Y.Assert.isNull(firstCol.getData('layout-col').get('value'));
        },

        'should add a col at the end of a row when click on the right button': function() {
            var addColButton,
                container,
                lastCol,
                row;

            this._createLayoutBuilder();

            container = this._layoutBuilder.get('container');
            row = container.one('.row');

            lastCol = row.all('.col').last();

            Y.Assert.isNotNull(lastCol.getData('layout-col').get('value'));

            addColButton = row.one('.layout-builder-add-col-right');
            addColButton.simulate('click');

            lastCol = row.all('.col').last();

            Y.Assert.isNull(lastCol.getData('layout-col').get('value'));
        },

        'should not append addCol button if row alreay has the maximum number of cols': function() {
            var col;

            this._createLayoutBuilder();

            col = Y.one('.col-sm-3');

            Y.Assert.isNull(col.one('.layout-builder-add-col'));
        },

        'should not add col if enableAddCol is false': function() {
            var addColButton,
                col;

            this._createLayoutBuilder({
                enableAddCols: false
            });

            col = Y.one('.col-sm-6');

            addColButton = col.one('.layout-builder-add-col');
            Y.Assert.isNull(addColButton);
        },

        'should enable/disable adding columns dynamically': function() {
            var addColButton,
                col,
                layout;

            this._createLayoutBuilder();

            col = Y.one('.col-sm-6');

            this._layoutBuilder.set('enableAddCols', false);

            addColButton = col.ancestor().one('.layout-builder-add-col');
            Y.Assert.isNull(addColButton);

            this._layoutBuilder.set('enableAddCols', true);

            addColButton = col.ancestor().one('.layout-builder-add-col');
            Y.Assert.isNotNull(addColButton);

            addColButton.simulate('click');
            layout = this._layoutBuilder.get('layout');
            Y.Assert.areEqual(layout.get('rows')[0].get('cols').length, 3);
        },

        'should add two add col buttons per row': function() {
            var container,
                row;

            this._createLayoutBuilder();

            container = this._layoutBuilder.get('container');
            row = container.one('.row');

            Y.Assert.areEqual(2, row.all('.layout-builder-add-col').size());
        },

        'should add addColButton to new rows': function() {
            var addColButtons,
                addRowButton,
                container;

            this._createLayoutBuilder();

            container = this._layoutBuilder.get('container');
            addColButtons = container.all('.layout-builder-add-col');

            Y.Assert.areEqual(2, addColButtons.size());

            addRowButton = container.one('.layout-builder-add-row-button');
            addRowButton.simulate('click');

            addColButtons = container.all('.layout-builder-add-col');

            Y.Assert.areEqual(4, addColButtons.size());
        }
    }));

    Y.Test.Runner.add(suite);

}, '', {
    requires: ['aui-layout-builder', 'node-event-simulate', 'test']
});