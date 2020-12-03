package com.project.videoSerwis.configuration;

import com.mongodb.ConnectionString;
import com.mongodb.MongoClientSettings;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Configuration;
import org.springframework.data.mongodb.config.AbstractMongoClientConfiguration;

@Configuration
class ApplicationConfig extends AbstractMongoClientConfiguration {

    @Value("${mongodb}")
    public String mongo_uri;

    @Value("${spring.data.mongodb.database}")
    public String database;

    @Override
    protected void configureClientSettings(MongoClientSettings.Builder builder) {
        builder.applyConnectionString(new ConnectionString("mongodb://"+mongo_uri));
    }

    @Override
    protected String getDatabaseName() {
        return database;
    }
}
