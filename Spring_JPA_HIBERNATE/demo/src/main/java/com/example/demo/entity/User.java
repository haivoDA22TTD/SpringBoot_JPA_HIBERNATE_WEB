package com.example.demo.entity;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;

@Entity
public class User {
    @Id
    private int id;
    private String name;
    private int level;
    // contractor rỗng
        public User() {
    }
    // contructor
        public User(int id, String name, int level) {
            this.id = id;
            this.name = name;
            this.level = level;
        }
    //setter & getter
        public int getId() {
            return id;
        }
        public void setId(int id) {
            this.id = id;
        }
        public String getName() {
            return name;
        }
        public void setName(String name) {
            this.name = name;
        }
        public int getLevel() {
            return level;
        }
        public void setLevel(int level) {
            this.level = level;
        }
        
        
}
