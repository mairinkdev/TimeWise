package com.timewise.backend.config;

import com.timewise.backend.model.Goal;
import com.timewise.backend.model.Role;
import com.timewise.backend.model.Task;
import com.timewise.backend.model.User;
import com.timewise.backend.repository.GoalRepository;
import com.timewise.backend.repository.TaskRepository;
import com.timewise.backend.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.boot.CommandLineRunner;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;

import java.time.LocalDate;
import java.util.ArrayList;

@Component
@RequiredArgsConstructor
public class DataInitializer implements CommandLineRunner {

    private final UserRepository userRepository;
    private final GoalRepository goalRepository;
    private final TaskRepository taskRepository;
    private final PasswordEncoder passwordEncoder;

    @Override
    public void run(String... args) throws Exception {
        // Criar usuário apenas se não existe
        if (userRepository.findByEmail("teste@example.com").isEmpty()) {
            User user = User.builder()
                    .name("Usuário Teste")
                    .email("teste@example.com")
                    .password(passwordEncoder.encode("123456"))
                    .role(Role.USER)
                    .goals(new ArrayList<>())
                    .build();
            userRepository.save(user);

            // Criar algumas metas
            Goal goal1 = Goal.builder()
                    .title("Aprender Spring Boot")
                    .description("Estudar Spring Boot e criar uma aplicação")
                    .priority("ALTA")
                    .dueDate(LocalDate.now().plusDays(30))
                    .user(user)
                    .tasks(new ArrayList<>())
                    .build();

            Goal goal2 = Goal.builder()
                    .title("Aprender React")
                    .description("Estudar React e criar um frontend")
                    .priority("MÉDIA")
                    .dueDate(LocalDate.now().plusDays(60))
                    .user(user)
                    .tasks(new ArrayList<>())
                    .build();

            goalRepository.save(goal1);
            goalRepository.save(goal2);

            // Criar algumas tarefas
            Task task1 = Task.builder()
                    .description("Estudar autenticação JWT")
                    .estimatedTime(120)
                    .status("PENDENTE")
                    .goal(goal1)
                    .build();

            Task task2 = Task.builder()
                    .description("Implementar API REST")
                    .estimatedTime(180)
                    .status("EM_ANDAMENTO")
                    .goal(goal1)
                    .build();

            Task task3 = Task.builder()
                    .description("Criar componentes com hooks")
                    .estimatedTime(240)
                    .status("PENDENTE")
                    .goal(goal2)
                    .build();

            taskRepository.save(task1);
            taskRepository.save(task2);
            taskRepository.save(task3);

            System.out.println("Dados iniciais criados com sucesso");
        }
    }
}
