let configTxt = `# This is what a comment looks like, ignore it

# All these config lines are valid

host = test.com

server_id=55331

server_load_alarm=2.5

user= user

# comment can appear here as well

verbose =true

test_mode = on

debug_mode = off

log_file_path = /tmp/logfile.log

dog_file is httpp.comm13

send_notifications = yes`;

function Parser(string){
  let storageObj = {};
  let singleLines = string.split(/\r\n|\r|\n/)
  let truths = {
    true: 1,
    on: 1,
    yes: 1,
  }
  let falses = {
    false: 1,
    off: 1,
    no: 1,
  }
  for (let i = 0; i <singleLines.length; i ++) {
    let line = singleLines[i];
    let section = line.split('=');
    if (line[0] === '#' || line[0] === ' ' || line[0] === undefined || section[1] === undefined) {
      continue;
    }
    let varName = section[0].trim();
    let val = section[1].trim();
    let testFloat = parseFloat(val);
    if (!(val.match(/[a-z]/i)) && !isNaN(testFloat)) {
      val = testFloat;
    }
    if (truths[val]) {
      val = true;
    }
    if (falses[val]) {
      val = false;
    }
    storageObj[varName] = val;
  }

  console.log(storageObj)
  return storageObj
}

let configs = Parser(configTxt);

//usage examples
let user = configs.user;
//start on staging, but switch to test environment if configs.test_mode is true
process.env = 'staging';
if (configs.test_mode) {
  process.env = 'test';
}
//host may be database url

//db = connect(configs.host)