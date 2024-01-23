package com.example.demo.repositories;

// import org.hibernate.mapping.List;
import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;
import com.example.demo.models.Image;

public interface ImageRepository extends JpaRepository<Image, Long>{
    List<Image> findByUserName(String username);
}
