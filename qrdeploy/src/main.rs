use std::{
    fs,
    path::Path,
    io::{prelude::*, BufReader},
    net::{TcpListener, TcpStream},
};
use local_ip_address::local_ip;

fn main() {
    let listener = TcpListener::bind("127.0.0.1:7878").unwrap();

    if let Ok(my_local_ip) = local_ip() {
        println!("http://{:?}:7878", my_local_ip);
    } else {
        panic!();
    }

    for stream in listener.incoming() {
        let stream = stream.unwrap();

        handle_connection(stream);
    }
}

fn handle_connection(mut stream: TcpStream) {
    let buf_reader = BufReader::new(&mut stream);
    let request_line = buf_reader.lines().next().unwrap().unwrap();

    let (status_line, filename) = if request_line == "GET / HTTP/1.1" {
        ("HTTP/1.1 200 OK", Path::new("../frontend/index.html"))
    } else {
        ("HTTP/1.1 404 NOT FOUND", Path::new("../frontend/index.html"))
    };

    let contents = fs::read_to_string(filename).unwrap();
    let length = contents.len();

    let response =
        format!("{status_line}\r\nContent-Length: {length}\r\n\r\n{contents}");

    stream.write_all(response.as_bytes()).unwrap();
}