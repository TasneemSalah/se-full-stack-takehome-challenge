package com.secretescapes.configuration;

import javax.sql.DataSource;

import org.springframework.boot.jdbc.DataSourceBuilder;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class DataSourceConfig {
   
    @Bean 
public DataSource getDataSource() { 
    DataSourceBuilder dataSourceBuilder = DataSourceBuilder.create(); 
    dataSourceBuilder.username("SA"); 
    dataSourceBuilder.password(""); 
    return dataSourceBuilder.build(); 
}
}
