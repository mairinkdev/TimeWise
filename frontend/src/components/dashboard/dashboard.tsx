"use client"

import { StatsCard } from "./stats-card"
import { ProgressChart } from "./progress-chart"
import { useEffect, useState } from "react"

const initialMockData = {
    activeGoals: 0,
    completedTasks: 0,
    weeklyProgress: [
        { day: "Segunda", completed: 4, total: 6 },
        { day: "Terça", completed: 5, total: 5 },
        { day: "Quarta", completed: 3, total: 7 },
        { day: "Quinta", completed: 6, total: 8 },
        { day: "Sexta", completed: 4, total: 6 },
        { day: "Sábado", completed: 2, total: 3 },
        { day: "Domingo", completed: 1, total: 2 },
    ]
}

const finalMockData = {
    activeGoals: 5,
    completedTasks: 28,
    weeklyProgress: initialMockData.weeklyProgress
}

export function DashboardComponent() {
    const [data, setData] = useState(initialMockData)
    const [isLoading, setIsLoading] = useState(true)
    const [isMounted, setIsMounted] = useState(false)

    useEffect(() => {
        setIsMounted(true)
    }, [])

    useEffect(() => {
        if (!isMounted) return

        const loadingTimeout = setTimeout(() => {
            setIsLoading(false)
        }, 1000)

        const counterInterval = setInterval(() => {
            setData((prev) => {
                const newActiveGoals = prev.activeGoals < finalMockData.activeGoals
                    ? prev.activeGoals + 1
                    : prev.activeGoals

                const newCompletedTasks = prev.completedTasks < finalMockData.completedTasks
                    ? prev.completedTasks + Math.ceil(finalMockData.completedTasks / 10)
                    : finalMockData.completedTasks

                const isDone = newActiveGoals === finalMockData.activeGoals
                    && newCompletedTasks >= finalMockData.completedTasks

                if (isDone) {
                    clearInterval(counterInterval)
                    return {
                        ...prev,
                        activeGoals: finalMockData.activeGoals,
                        completedTasks: finalMockData.completedTasks,
                    }
                }

                return {
                    ...prev,
                    activeGoals: newActiveGoals,
                    completedTasks: Math.min(newCompletedTasks, finalMockData.completedTasks),
                }
            })
        }, 100)

        return () => {
            clearTimeout(loadingTimeout)
            clearInterval(counterInterval)
        }
    }, [isMounted])

    return (
        <div className="space-y-6">
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                <div className={`transition-all duration-300 ease-in-out ${isLoading && isMounted ? 'opacity-0 translate-y-4' : 'opacity-100 translate-y-0'}`}>
                    <StatsCard
                        title="Metas Ativas"
                        value={data.activeGoals}
                        description="Metas em andamento atualmente"
                        icon="Target"
                        trend="+2 na última semana"
                        trendUp={true}
                    />
                </div>
                <div className={`transition-all duration-300 delay-150 ease-in-out ${isLoading && isMounted ? 'opacity-0 translate-y-4' : 'opacity-100 translate-y-0'}`}>
                    <StatsCard
                        title="Tarefas Concluídas"
                        value={data.completedTasks}
                        description="Total de tarefas finalizadas"
                        icon="CheckCircle"
                        trend="+12 na última semana"
                        trendUp={true}
                    />
                </div>
                <div className={`transition-all duration-300 delay-300 ease-in-out ${isLoading && isMounted ? 'opacity-0 translate-y-4' : 'opacity-100 translate-y-0'}`}>
                    <StatsCard
                        title="Taxa de Conclusão"
                        value={73}
                        description="Porcentagem de tarefas concluídas"
                        icon="PieChart"
                        trend="+8% desde o último mês"
                        trendUp={true}
                        suffix="%"
                    />
                </div>
            </div>

            <div className={`transition-all duration-500 delay-500 ease-in-out md:col-span-2 lg:col-span-3 ${isLoading && isMounted ? 'opacity-0 scale-95' : 'opacity-100 scale-100'}`}>
                <ProgressChart data={data.weeklyProgress} />
            </div>
        </div>
    )
}
