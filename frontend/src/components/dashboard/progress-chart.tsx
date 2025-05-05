"use client"

import { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

interface ProgressDay {
    day: string;
    completed: number;
    total: number;
}

interface ProgressChartProps {
    data: ProgressDay[];
}

export function ProgressChart({ data }: ProgressChartProps) {
    const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
    const [isMounted, setIsMounted] = useState(false);

    useEffect(() => {
        setIsMounted(true);
    }, []);

    const chartData = data.map(day => ({
        ...day,
        percentage: Math.round((day.completed / day.total) * 100)
    }));

    const maxTotal = Math.max(...chartData.map(day => day.total));

    const totalTasks = chartData.reduce((sum, day) => sum + day.total, 0);
    const completedTasks = chartData.reduce((sum, day) => sum + day.completed, 0);
    const avgCompletion = Math.round((completedTasks / totalTasks) * 100);

    const showInteractivity = isMounted;

    return (
        <Card className="border-none bg-white shadow-lg transition-all duration-200 hover:shadow-xl">
            <CardHeader>
                <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
                    <div>
                        <CardTitle className="text-xl font-semibold text-gray-900">Progresso Semanal</CardTitle>
                        <CardDescription className="mt-1 text-sm text-gray-500">
                            Visão das tarefas concluídas vs. planejadas na semana atual
                        </CardDescription>
                    </div>
                    <div className="flex flex-row items-center rounded-lg bg-blue-50 px-3 py-2">
                        <div className="text-center">
                            <p className="text-xs font-medium text-gray-500">Taxa Média</p>
                            <p className="text-lg font-bold text-blue-600">{avgCompletion}%</p>
                        </div>
                    </div>
                </div>
            </CardHeader>
            <CardContent>
                <div className="mt-4 h-[300px] w-full">
                    <div className="flex h-[250px] w-full items-end justify-between gap-2">
                        {chartData.map((day, index) => (
                            <div
                                key={index}
                                className="group flex h-full flex-1 flex-col items-center justify-end gap-1"
                                onMouseEnter={showInteractivity ? () => setHoveredIndex(index) : undefined}
                                onMouseLeave={showInteractivity ? () => setHoveredIndex(null) : undefined}
                            >
                                <div
                                    className="relative flex w-full flex-col items-center"
                                    style={{ height: `${(day.total / maxTotal) * 200}px` }}
                                >
                                    {showInteractivity && hoveredIndex === index && (
                                        <div className="absolute -top-16 left-1/2 z-10 min-w-32 -translate-x-1/2 rounded-md bg-gray-800 p-2 text-xs text-white shadow-lg">
                                            <p className="font-medium">{day.day}</p>
                                            <div className="mt-1 grid grid-cols-2 gap-x-2">
                                                <p>Total:</p>
                                                <p className="text-right font-semibold">{day.total}</p>
                                                <p>Concluídas:</p>
                                                <p className="text-right font-semibold">{day.completed}</p>
                                                <p>Taxa:</p>
                                                <p className="text-right font-semibold">{day.percentage}%</p>
                                            </div>
                                            <div className="mt-1 h-1 w-full overflow-hidden rounded-full bg-gray-600">
                                                <div
                                                    className="h-full bg-green-400"
                                                    style={{ width: `${day.percentage}%` }}
                                                />
                                            </div>
                                        </div>
                                    )}

                                    <div
                                        className="relative w-full overflow-hidden rounded-t-md bg-blue-100 transition-all duration-300 group-hover:bg-blue-200"
                                        style={{
                                            height: '100%'
                                        }}
                                    >
                                        <div
                                            className="absolute bottom-0 w-full bg-blue-500 transition-all duration-500 ease-out group-hover:bg-blue-600"
                                            style={{
                                                height: `${(day.completed / day.total) * 100}%`,
                                                transition: 'height 0.5s ease-out'
                                            }}
                                        />
                                    </div>
                                    <span className="mt-2 text-xs font-medium">{day.day.substring(0, 3)}</span>
                                </div>

                                <div className="mt-1 flex w-full justify-between px-1 text-xs text-gray-500">
                                    <span>{day.completed}</span>
                                    <span>{day.percentage}%</span>
                                </div>
                            </div>
                        ))}
                    </div>

                    <div className="mt-6 flex justify-between border-t pt-4 text-xs text-gray-500">
                        <div className="flex items-center gap-2">
                            <div className="h-3 w-3 rounded-sm bg-blue-100" />
                            <span>Total planejado</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <div className="h-3 w-3 rounded-sm bg-blue-500" />
                            <span>Concluídas</span>
                        </div>
                    </div>
                </div>
            </CardContent>
        </Card>
    );
}
