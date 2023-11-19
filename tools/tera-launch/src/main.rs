use std::collections::HashMap;

use clap::Parser;
use clap::Subcommand;
use serde::Deserialize;

#[derive(Parser, Debug)]
#[command(author, version, about, long_about=None)]
struct TeraLaunchCli {
    #[command(subcommand)]
    cmd: Commands,
}

#[derive(Subcommand, Debug)]
enum Commands {
    #[command(
        about = "Run a target from a file or the default TLAUNCH.toml file in the root of the project."
    )]
    Run {
        target: Option<String>,
        #[arg(short, long)]
        file: Option<String>,
    },

    #[command(
        about = "List all targets in the default TLAUNCH.toml file in the root of the project."
    )]
    List {
        #[arg(short, long)]
        file: Option<String>,
    },
}

// read a toml file
// parse it into a struct
#[derive(Debug, Deserialize)]
struct TLaunch {
    global_variables: Option<HashMap<String, Variable>>,
    targets: HashMap<String, Target>,
}

type Variable = String;
// #[derive(Debug, Deserialize)]
// struct Variable {
//     value: String,
// }

// targets can have dependencies on other targets
#[derive(Debug, Deserialize)]
struct Target {
    variables: Option<HashMap<String, String>>,
    description: Option<String>,
    steps: Vec<Step>,
    dependencies: Option<Vec<String>>,
}

#[derive(Debug, Deserialize)]
struct Step {
    command: String,
    args: Option<Vec<String>>,
    // where to store the output of the command
    output: Option<String>,
    piped: Option<bool>,
}

fn run_target(target: Option<String>, file: String) -> bool {
    true
}

fn list_targets(file: String) {}

fn main() {
    let cli = TeraLaunchCli::parse();
    let default_file = "TLAUNCH.toml".to_string();
    println!("{:?}", cli);
    if let Commands::Run { target, file } = cli.cmd {
        run_target(target, file.unwrap_or(default_file));
    } else if let Commands::List { file } = cli.cmd {
        list_targets(file.unwrap_or(default_file));
    }

    let tlaunch = read_tlaunch_file();

    for (target_name, target) in tlaunch.targets {
        println!("Target: {}", target_name);

        println!("\tDescription: ");
        for (index, step) in target.steps.iter().enumerate() {
            println!("\tStep [{:?}]", index);
            println!("\t\tCommand: {}", step.command);
            println!(
                "\t\tOutput: {}",
                step.output.clone().unwrap_or("".to_string())
            );
            println!("\t\tPiped: {}", step.piped.unwrap_or(false));
            println!("\t\tArguments:");
            for arg in step.args.clone().unwrap() {
                println!("\t\t{}", arg);
            }
        }
    }
}

fn read_tlaunch_file() -> TLaunch {
    let toml_str = std::fs::read_to_string("TLAUNCH.toml").unwrap();
    let tlaunch: TLaunch = toml::from_str(&toml_str).unwrap();
    tlaunch
}
