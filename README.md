## Welcome to jquery-string-list-input

jQuery widget for string list input.

## Installation

Using Bower:

```
bower install jquery-string-list-input
```

Using NPM:

```
npm install jquery-string-list-input
```

Or simply copy jquery-string-list-input.css and jquery-string-list-input.js files to your project.

## Example

### Basic example

```javascript
    $('#textarea[data-provide="string-list-input"]').stringListInput({
    });
```

### Custom labels

```javascript
    $('#textarea[data-provide="string-list-input"]').stringListInput({
        addText: 'I want to add a text',
        labelText: 'My custom text',
        removeText: 'I want to delete this text',
    });
```

### With suggestions

```javascript
    $('#textarea[data-provide="string-list-input"]').stringListInput({
        suggestions: ['apple', 'facebook', 'google', 'amazon'],
    });
```

### Custom events

```javascript
    $('#textarea[data-provide="string-list-input"]').stringListInput({
        onUpdate: function(items) {
            alert(JSON.stringify(items));
        }
    });
```

## Reference

### Options

| Option  | Default | Mandatory | Description |
| ------------- | ------------- | ------------- | ------------- |
| addText | 'Add' | No | Display text on Add button |
| cursor | 'move' | No | `cursor` option for jquery-ui sortable |
| distance | 5 | No | `distance` option for jquery-ui sortable |
| hide | true | No | Hide original input |
| labelText | 'Expression' | No | Display text above each generated input |
| opacity | .5 | No | `opacity` option for jquery-ui sortable |
| removeText | 'Delete' | No | Display text on delete buttons |
| suggestions | [] | No | Suggestions in each input generated. Requires [jquery-textcomplete](https://github.com/yuku-t/jquery-textcomplete) |


### Events

| Option  | Default | Mandatory | Description |
| ------------- | ------------- | ------------- | ------------- |
| onUpdate | undefined | No | Triggered every time the input is updated. |

## Dependencies

- jquery (Tested with v2.1.4)
- jquery-ui (Tested with v1.10.4)
- [jquery-textcomplete](https://github.com/yuku-t/jquery-textcomplete) (optional)

## Usage

## License

Please see [LICENSE](LICENSE) for licensing details.
