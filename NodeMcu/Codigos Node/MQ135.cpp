#include <Wire.h>

#define MQ135_PIN 2 // Conecta tu MQ135 a la entrada analógica 2

void setup() {
  Serial.begin(9600);
  
}

void loop() {
  int mq135_value = analogRead(MQ135_PIN)/4;
  Serial.print("MQ135 Value: ");
  Serial.println(mq135_value);

  delay(1000);
}
