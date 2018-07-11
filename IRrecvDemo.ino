/*
 * IRremote: IRrecvDemo - demonstrates receiving IR codes with IRrecv
 * An IR detector/demodulator must be connected to the input RECV_PIN.
 * Version 0.1 July, 2009
 * Copyright 2009 Ken Shirriff
 * http://arcfn.com
 */

#include <IRremote.h>

int RECV_PIN = 13;
int led_pin = 2;
IRrecv irrecv(RECV_PIN);

decode_results results;

char stringOk[] = "4040b04f"; // The Remote OK Button HEX Code
char stringOff[] = "404050af"; // The remote POWER Button HEX Code
void setup()
{
  Serial.begin(9600);
  // In case the interrupt driver crashes on setup, give a clue
  // to the user what's going on.
  pinMode(led_pin, OUTPUT);
  Serial.println("Enabling IRin");
  irrecv.enableIRIn(); // Start the receiver
  Serial.println("Enabled IRin");
}

void loop() {
  if (irrecv.decode(&results)) {
    Serial.println(String(results.value, HEX));
    if (String(results.value, HEX) == stringOk) { 
      Serial.println("You have pressed the menu button");
      digitalWrite(led_pin, HIGH);
    } else if (String(results.value, HEX) == stringOff) {
      Serial.println("You have pressed the power button");
      digitalWrite(led_pin, LOW);
    }
    irrecv.resume(); // Receive the next value
  }
  delay(100);
}
