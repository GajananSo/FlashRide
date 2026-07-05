//package com.alpha.FlashRide.security;
//
//import org.springframework.context.annotation.Bean;
//import org.springframework.context.annotation.Configuration;
//import org.springframework.security.authentication.AuthenticationManager;
//import org.springframework.security.config.annotation.authentication.configuration.AuthenticationConfiguration;
//import org.springframework.security.config.annotation.web.builders.HttpSecurity;
//import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
//import org.springframework.security.config.http.SessionCreationPolicy;
//import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
//import org.springframework.security.crypto.password.PasswordEncoder;
//import org.springframework.security.web.SecurityFilterChain;
//import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
//
//@Configuration
//@EnableWebSecurity
//public class SecurityConfig {
//
//    private final JwtFilter jwtFilter;
//
//    public SecurityConfig(JwtFilter jwtFilter) {
//        this.jwtFilter = jwtFilter;
//    }
//
//    @Bean
//    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
//
//        http
//            .csrf(csrf -> csrf.disable())
//            .sessionManagement(session ->
//                session.sessionCreationPolicy(SessionCreationPolicy.STATELESS)
//            )
//            .authorizeHttpRequests(auth -> auth
//                .requestMatchers("/auth/**").permitAll()
//                .requestMatchers("/customer/**").hasRole("CUSTOMER")
//                .requestMatchers("/driver/**").hasRole("DRIVER")
//                .anyRequest().authenticated()
//            )
//            .addFilterBefore(jwtFilter, UsernamePasswordAuthenticationFilter.class);
//
//        return http.build();
//    }
//
//    @Bean
//    public PasswordEncoder passwordEncoder() {
//        return new BCryptPasswordEncoder();
//    }
//
//    @Bean
//    public AuthenticationManager authenticationManager(
//            AuthenticationConfiguration config) throws Exception {
//        return config.getAuthenticationManager();
//    }
//}
//
//
////package com.alpha.FlashRide.security;
////
////import org.springframework.context.annotation.Bean;
////import org.springframework.context.annotation.Configuration;
////import org.springframework.security.authentication.AuthenticationManager;
////import org.springframework.security.config.Customizer;
////import org.springframework.security.config.annotation.authentication.configuration.AuthenticationConfiguration;
////import org.springframework.security.config.annotation.web.builders.HttpSecurity;
////import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
////import org.springframework.security.config.http.SessionCreationPolicy;
////import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
////import org.springframework.security.crypto.password.PasswordEncoder;
////import org.springframework.security.web.SecurityFilterChain;
////import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
////import org.springframework.web.cors.CorsConfiguration;
////import org.springframework.web.cors.CorsConfigurationSource;
////import org.springframework.web.cors.UrlBasedCorsConfigurationSource;
////import java.util.Arrays;
////
////@Configuration
////@EnableWebSecurity
////public class SecurityConfig {
////
////    private final JwtFilter jwtFilter;
////
////    public SecurityConfig(JwtFilter jwtFilter) {
////        this.jwtFilter = jwtFilter;
////    }
////
////    @Bean
////    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
////        http
////            // 1. Enable CORS with the bean defined below
////            .cors(Customizer.withDefaults())
////            .csrf(csrf -> csrf.disable())
////            .sessionManagement(session ->
////                session.sessionCreationPolicy(SessionCreationPolicy.STATELESS)
////            )
////            .authorizeHttpRequests(auth -> auth
////            	    .requestMatchers("/auth/**").permitAll()
////            	    .requestMatchers(org.springframework.http.HttpMethod.OPTIONS, "/**").permitAll()
////            	    
////            	    // 🚦 ADD THIS LINE HERE
////            	    .requestMatchers("/vehicle/**").hasRole("DRIVER") 
////            	    
////            	    .requestMatchers("/customer/**").hasRole("CUSTOMER")
////            	    .requestMatchers("/driver/**").hasRole("DRIVER")
////            	    .anyRequest().authenticated()
////            	)
////            .addFilterBefore(jwtFilter, UsernamePasswordAuthenticationFilter.class);
////
////        return http.build();
////    }
////
////    // 3. Define the CORS configuration
////    @Bean
////    public CorsConfigurationSource corsConfigurationSource() {
////        CorsConfiguration configuration = new CorsConfiguration();
////        // Allow your React Frontend
////        configuration.setAllowedOrigins(Arrays.asList("http://localhost:5173"));
////        // Allow all common HTTP methods
////        configuration.setAllowedMethods(Arrays.asList("GET", "POST", "PUT", "DELETE", "OPTIONS"));
////        // Allow necessary headers
////        configuration.setAllowedHeaders(Arrays.asList("Authorization", "Content-Type", "Accept"));
////        // Allow cookies/auth headers
////        configuration.setAllowCredentials(true);
////        
////        UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
////        source.registerCorsConfiguration("/**", configuration);
////        return source;
////    }
////
////    @Bean
////    public PasswordEncoder passwordEncoder() {
////        return new BCryptPasswordEncoder();
////    }
////
////    @Bean
////    public AuthenticationManager authenticationManager(
////            AuthenticationConfiguration config) throws Exception {
////        return config.getAuthenticationManager();
////    }
////}
///
///



package com.alpha.FlashRide.security;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.config.annotation.authentication.configuration.AuthenticationConfiguration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;

import java.util.Arrays;

@Configuration
@EnableWebSecurity
public class SecurityConfig {

    private final JwtFilter jwtFilter;

    public SecurityConfig(JwtFilter jwtFilter) {
        this.jwtFilter = jwtFilter;
    }

    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {

        http
            // 1. ADD THIS LINE to enable CORS with the configuration below
            .cors(cors -> cors.configurationSource(corsConfigurationSource()))
            .csrf(csrf -> csrf.disable())
            .sessionManagement(session ->
                session.sessionCreationPolicy(SessionCreationPolicy.STATELESS)
            )
//            .authorizeHttpRequests(auth -> auth
//                 .requestMatchers("/auth/**").permitAll()
//            		.requestMatchers("/driver/findallvehicle").permitAll() 
//            		.requestMatchers("/bookVehicle").permitAll()
//                .requestMatchers("/customer/**").hasRole("CUSTOMER")
//                .requestMatchers("/driver/**").hasRole("DRIVER")
//                .anyRequest().authenticated()
            
            
            .authorizeHttpRequests(auth -> auth
            	    .requestMatchers("/auth/**").permitAll()
            	    .requestMatchers("/driver/findallvehicle").permitAll() 
            	    
            	    // 1. UPDATED: Allow DRIVERs to see and manage vehicles too
            	    .requestMatchers("/vehicle/**").hasAnyRole("CUSTOMER", "DRIVER", "ADMIN")
            	    
            	    // 2. Allow access to /booking/active, /booking/history, etc.
            	    .requestMatchers("/booking/**").hasRole("CUSTOMER") 
            	    
            	    // 3. Keep existing role-based rules
            	    .requestMatchers("/customer/**").hasRole("CUSTOMER")
            	    .requestMatchers("/driver/**").hasRole("DRIVER")
            	    
            	    .anyRequest().authenticated()
            	)
            .addFilterBefore(jwtFilter, UsernamePasswordAuthenticationFilter.class);

        return http.build();
    }

    // 2. ADD THIS BEAN to define which origins are allowed
    @Bean
    public CorsConfigurationSource corsConfigurationSource() {
        CorsConfiguration configuration = new CorsConfiguration();
        
        // Allow your React app's specific origins
        configuration.setAllowedOrigins(Arrays.asList("http://localhost:5173", "http://localhost:5174"));
        
        // Allow all standard HTTP methods
        configuration.setAllowedMethods(Arrays.asList("GET", "POST", "PUT", "DELETE", "OPTIONS"));
        
        // Allow all headers (Crucial for Authorization header)
        configuration.setAllowedHeaders(Arrays.asList("Authorization", "Content-Type", "Accept","X-Requested-With"));
        
        // Allow credentials (cookies/auth headers)
        configuration.setAllowCredentials(true);

        UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
        source.registerCorsConfiguration("/**", configuration);
        return source;
    }

    @Bean
    public PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }

    @Bean
    public AuthenticationManager authenticationManager(
            AuthenticationConfiguration config) throws Exception {
        return config.getAuthenticationManager();
    }
}
